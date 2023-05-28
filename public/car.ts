import p5 from "p5";
import {Vector, Dimensions, Coordinates, HSLColor, constrain} from "./Utils"

let keys = {
    'ArrowUp': false,
    'ArrowDown': false,
    'ArrowLeft': false,
    'ArrowRight': false
};

// Listen for keydown event and update the state of the corresponding key
window.addEventListener('keydown', (e) => {
    if (keys.hasOwnProperty(e.key)) {
        keys[e.key] = true;
    }
});

// Listen for keyup event and update the state of the corresponding key
window.addEventListener('keyup', (e) => {
    if (keys.hasOwnProperty(e.key)) {
        keys[e.key] = false;
    }
});

class Car {
    turnRateStatic: number;
    turnRateDynamic: number;
    turnRate: number;
    gripStatic: number;
    gripDynamic: number;
    DRIFT_CONSTANT: number;
    pos: Vector;
    velocity: Vector;
    acceleration: Vector;
    angle: number;
    mass: number;
    width: number;
    length: number;
    force: number;
    isDrifting: boolean;
    color: HSLColor;
    id: string;
    trail: any[];
    trailCounter: number;
    targetPosition: Vector | null;
    targetAngle: number | null;
    score: number;
    frameScore: number;
    lastDriftTime: number;
    driftScore: number;
    idleTime: number;


    constructor(posX = window.innerWidth / 2, posY = window.innerHeight / 2, angle = 0) {
        this.turnRateStatic = 0.06;
        this.turnRateDynamic = 0.05;
        this.turnRate = this.turnRateStatic;
        this.gripStatic = .8;
        this.gripDynamic = 0.1;
        this.DRIFT_CONSTANT = 1.7;
        this.pos = new Vector(posX, posY);
        this.velocity = new Vector(0, 0);
        this.acceleration = new Vector(0, 0);
        this.angle = angle;
        this.mass = 13;
        this.width = 18;
        this.length = 30;
        this.force = 0.09;
        this.isDrifting = false;
        this.color = new HSLColor(0, 100, 50);
        this.id = "";
        this.trail = [];
        this.trailCounter = 0;
        this.targetPosition = null;
        this.targetAngle = null;
        this.score = 0;
        this.frameScore = 0;
        this.lastDriftTime = 0;
        this.driftScore = 0;
        this.idleTime = 0;
    }

    /*******************************************************************************
     *  Safely read car variables
     ******************************************************************************/
    getPos(): Coordinates {
        return {x: this.pos.x, y: this.pos.y}
    }

    isDrift(): boolean {
        return this.isDrifting;
    }

    getAngle(): number {
        return this.angle;
    }

    setAngle(angle: number) {
        this.angle = angle;
    }

    setTrail(trail: any[]) {
        this.trail = trail;
    }

    getTrail() {
        return this.trail;
    }


    show(ctx) {
        // Save the current context
        ctx.save();

        // Translate and rotate the context
        ctx.translate(this.pos.x, this.pos.y);
        ctx.rotate(this.angle);

        // Set stroke and fill styles
        ctx.lineWidth = this.isDrifting ? 3 : 2;
        ctx.fillStyle = this.color;
        ctx.strokeStyle = '#000';  // Assuming the stroke color to be black

        // Draw the car body and front side indicator
        ctx.fillRect(-this.width / 2, -this.length / 2, this.width, this.length);
        ctx.strokeRect(-this.width / 2, -this.length / 2, this.width, this.length);

        ctx.fillRect(-this.width / 2 + 1, 0, this.width - 2, 6);
        ctx.strokeRect(-this.width / 2 + 1, 0, this.width - 2, 6);

        // Restore the context to its original state
        ctx.restore();
    }

    update() {
        // Add input forces
        if (keys['ArrowUp'] || keys['ArrowDown'] || keys['ArrowLeft'] || keys['ArrowRight']) {
            // ACCELERATING (BODY-FIXED to WORLD)
            if (keys['ArrowUp']) {
                let bodyAcc = new Vector(0, this.force);
                let worldAcc = this.vectBodyToWorld(bodyAcc, this.angle);
                this.acceleration.add(worldAcc);
            }
            // BRAKING (BODY-FIXED TO WORLD)
            if (keys['ArrowDown']) {
                let bodyAcc = new Vector(0, -this.force);
                let worldAcc = this.vectBodyToWorld(bodyAcc, this.angle);
                this.acceleration.add(worldAcc);
            }
            if (keys['ArrowLeft']) {
                this.angle -= this.turnRate;
            }
            if (keys['ArrowRight']) {
                this.angle += this.turnRate;
            }
        }


        // Car steering and drifting physics

        // Rotate the global velocity vector into a body-fixed one. x = sideways
        // velocity, y = forward/backwards
        let vB = this.vectWorldToBody(this.velocity, this.angle);

        let bodyFixedDrag;
        let grip;
        if (Math.abs(vB.x) < this.DRIFT_CONSTANT) {
            // Gripping
            grip = this.gripStatic
            this.turnRate = this.turnRateStatic;
            this.isDrifting = false;
        } else {
            // Drifting
            grip = this.gripDynamic;
            this.turnRate = this.turnRateDynamic;
            this.isDrifting = true;
        }
        bodyFixedDrag = new Vector(vB.x * -grip, vB.y * 0.05);

        // Rotate body fixed forces into world fixed and add to acceleration
        let worldFixedDrag =
            this.vectBodyToWorld(bodyFixedDrag, this.angle)
        this.acceleration.add(
            worldFixedDrag.div(this.mass)); // Include inertia

        // Physics Engine
        this.angle = this.angle % (2 * Math.PI); // Restrict angle to one revolution
        this.velocity.add(this.acceleration);
        this.pos.add(this.velocity);
        this.acceleration = new Vector(0, 0); // Reset acceleration for next frame


        // Update the score
        let score = this.calculateScore(this.velocity, this.angle)
        this.score += score;
        this.driftScore += score;
        this.frameScore = score;

        // Reset the score if not drifting for 3 seconds
        if (this.isDrifting) {
            this.lastDriftTime = Date.now();
        } else if (this.lastDriftTime !== null && Date.now() - this.lastDriftTime > 3000) {
            this.resetScore();
        } else {
            this.driftScore = 0;
        }

    }

    interpolatePosition() {
        if (this.targetPosition) {
            let distance = Vector.dist(this.pos, this.targetPosition);
            // if difference is too large, just teleport
            if (distance > 500) {
                this.pos = new Vector(this.targetPosition.x, this.targetPosition.y);
                this.targetPosition = null;
            } else {
                let targetPos = new Vector(this.targetPosition.x, this.targetPosition.y);
                this.pos = Vector.lerp(this.pos, targetPos, 0.1);
            }
            if (distance < 1) {
                this.targetPosition = null;
            }
        }
        if (this.targetAngle !== null) {
            let difference = this.targetAngle - this.angle;
            while (difference < -Math.PI) difference += Math.PI * 2;
            while (difference > Math.PI) difference -= Math.PI * 2;

            if (Math.abs(difference) > Math.PI / 2) {
                this.angle = this.targetAngle;
                this.targetAngle = null;
            } else {
                let turnDirection = difference > 0 ? 1 : -1;
                this.angle += this.turnRate * turnDirection;
                if (Math.abs(this.targetAngle - this.angle) < this.turnRate) {
                    this.angle = this.targetAngle;
                    this.targetAngle = null;
                }
            }
        }
    }

    calculateScore(velocity: Vector, angle: number): number {
        let score = 0;
        let angleDifference = this.getAngleDifference(angle, velocity);

        // Calculate the score based on the angle difference and the velocity
        score = (1 - Math.sin(angleDifference)) * velocity.mag();

        return score;
    }

    getAngleDifference(angle: number, velocity: Vector) {
        // Create a vector representing the car's direction
        let carDirection = new Vector(Math.cos(angle), Math.sin(angle));

        // Normalize the vectors
        let vNormalized = velocity.copy().normalize();
        let carDirectionNormalized = carDirection.normalize()

        // Calculate the dot product of the vectors
        let dotProduct = vNormalized.dot(carDirectionNormalized);

        // return the angle between the vectors
        return Math.acos(dotProduct);
    }

    resetScore() {
        this.score = 0;
    }

    /*******************************************************************************
     * Rotation Matrices
     *   Rotate a vector from one frame of reference to the other.
     ******************************************************************************/

    // Body to world rotation
    vectBodyToWorld(vect: Vector, ang: number) {
        let v = vect.copy();
        let vn = new Vector(v.x * Math.cos(ang) - v.y * Math.sin(ang),
            v.x * Math.sin(ang) + v.y * Math.cos(ang));
        return vn;
    }

    // World to body rotation
    vectWorldToBody(vect: Vector, ang: number) {
        let v = vect.copy();
        let vn = new Vector(v.x * Math.cos(ang) + v.y * Math.sin(ang),
            v.x * Math.sin(ang) - v.y * Math.cos(ang));
        return vn;
    }

    setPosition(position: Vector) {
        this.pos = position;
    }

    setDrift(drifting: boolean) {
        this.isDrifting = drifting;
    }

    // Add a new method for collision detection

    checkCollision(boundaries: number[][]) {
        // Iterate over each boundary line
        for (let i = 0; i < boundaries.length - 1; i++) {
            let start = new Vector(boundaries[i][0], boundaries[i][1]);
            let end = new Vector(boundaries[i + 1][0], boundaries[i + 1][1]);
            let carPos = this.pos;

            // Calculate the distance from the car to the boundary line
            let lineDist = Vector.dist(carPos, this.closestPointOnLine(start, end, carPos));

            // Check if the distance is less than the car's size (assuming the car is a circle with diameter of car.l)
            if (lineDist < this.length / 2) {
                // Calculate the normal vector
                let boundaryVector = Vector.sub(end, start);
                let normalVector = new Vector(-boundaryVector.y, boundaryVector.x);
                normalVector = normalVector.normalize();

                // Push the car back
                let pushBack = normalVector.mult((this.length / 2 - lineDist) * .5);
                this.pos.add(pushBack);
                this.velocity.mult(0.95);
                this.velocity.add(pushBack);

                this.resetScore();
                return true; // Collision detected
            }
        }

        return false; // No collision
    }

    // Helper method to find the closest point on a line to a given point
    closestPointOnLine(start: Vector, end: Vector, point: Vector): Vector {
        let startToEnd = Vector.sub(end, start);
        let startToPoint = Vector.sub(point, start);

        let magnitude = startToEnd.mag();
        let startToEndNormalized = startToEnd.normalize();

        let dot = startToPoint.dot(startToEndNormalized);

        dot = constrain(dot, 0, magnitude);

        return Vector.add(start, startToEndNormalized.mult(dot));
    }
}

export default Car;