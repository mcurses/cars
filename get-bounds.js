let { SvgPath } = require('@larsgw/svg-path');
const util = require('util');
let path3 = new SvgPath('m4533.33,360.65c-614.29-300-500,80.96-847.62,309.53-347.62,228.57-189.67,7.85-500,452.38-176.19,252.38-385.71,433.33-57.14-66.67,328.57-500,380.95-519.05-171.43-857.14-552.38-338.1-395.24-190.48-828.57,47.62-433.34,238.09-195.24,480.95-319.05,728.57-123.81,247.62,571.43,328.57,95.24,400-576.09,86.41-4.76-490.48-71.43-928.57C1766.66,8.27,1261.9,74.94,1019.04,255.89c-242.85,180.95-342.85,185.72-233.33,814.29,0,0-95.24,23.81-85.71,504.76,9.52,480.95,76.19,766.67,719.04,1198.95,642.86,432.28,804.76-265.62,1266.67-498.95,461.9-233.33-338.1,100,923.81,419.05,1261.9,319.04,1214.28-385.72,1314.28-909.53,100-523.81,223.81-1123.81-390.47-1423.81Zm-323.81,1633.34c-380.95-180.96-190.48,214.28-680.95,80.95-490.48-133.33-171.43-238.1-700-157.14-528.57,80.95-376.19,276.19-747.62,371.43-371.43,95.23-666.67,138.09-609.53-19.05,57.15-157.15,52.38-314.29,52.38-314.29-404.76-214.28-428.57-154.71-385.71-470.21s200-444.07,152.38-563.12,85.72,104.76,85.72,104.76c0,0-128.58-19.05-95.24,347.62,33.33,366.67,23.81,261.9,257.14,428.57s-95.24,709.52,447.62,71.43c542.86-638.1,800-688.82,676.19-987.27-123.81-298.44-47.62-341.3,4.76-288.92s137.39,304.76,25.84,590.48c-111.55,285.71-773.46,776.19-216.31,714.28,557.14-61.9,352.38,14.29,980.95-214.28,677.46-246.35,538.09-533.34,619.05-442.86,80.95,90.47,257.14-128.57,223.81,209.52-33.34,338.1,290.47,719.05-90.48,538.1Z');
let pb3 = path3.getPolygons();
let path1 = new SvgPath('m2341.76,1155.5c-753.04-165.69-399.67,434.74-692.31,380.77-209.88-38.7-383.27-343.74-311.54-488.46,87.18-175.86,474.32,10.15,753.85-226.92,208.86-177.14,293.71-536.25,169.23-707.69C2116.55-85.75,1365.22,3.23,922.53,190.12,487.91,424.73,202.84,147.18,49.45,367.04c-96.01,137.63-24.01,494.92-7.69,661.54,70.03,715.08,460.64,531.33,523.88,768.92,73.33,275.53-247.56,82.9-185.42,392.62,43.18,215.21,277.73,329.11,388.46,388.46,498.72,267.3,1382.01,109.02,1676.92-407.69,220.85-386.93,98.35-970.9-103.84-1015.39Zm-426.92,1046.16c-414.87,257.74-1034.93,250.78-1063.5,82.05-41.12-242.83,300.48-212.18,251.96-428.21-41.85-186.28-629.94-515.39-709.99-756.73-40.51-122.17-58.44-410.77,5.09-518.67,101.5-172.38,290.14,45.23,577.72-138.72,292.93-146.52,790.09-216.29,885.67-60.31,82.37,134.42-152.23,138.41-290.44,277.29-184.97,185.87-419.28,118.18-521.1,227.6-669.23,719.24,418.44,978.5,560.33,987.31,575.82,35.77,372.23-305.31,506.07-258.5,131.38,45.94,84.21,409.19-201.81,586.89Z');
let pb1 = path1.getPolygons();
// console.dir(pb1, {'maxArrayLength': null})
// let path2 = new SvgPath('m2341.76,1155.5c-753.04-165.69-399.67,434.74-692.31,380.77-209.88-38.7-383.27-343.74-311.54-488.46,87.18-175.86,474.32,10.15,753.85-226.92,208.86-177.14,293.71-536.25,169.23-707.69C2116.55-85.75,1365.22,3.23,922.53,190.12,487.91,424.73,202.84,147.18,49.45,367.04c-96.01,137.63-24.01,494.92-7.69,661.54,70.03,715.08,460.64,531.33,523.88,768.92,73.33,275.53-247.56,82.9-185.42,392.62,43.18,215.21,277.73,329.11,388.46,388.46,498.72,267.3,1382.01,109.02,1676.92-407.69,220.85-386.93,98.35-970.9-103.84-1015.39Zm-426.92,1046.16c-414.87,257.74-1034.93,250.78-1063.5,82.05-41.12-242.83,300.48-212.18,251.96-428.21-41.85-186.28-629.94-515.39-709.99-756.73-40.51-122.17-58.44-410.77,5.09-518.67,101.5-172.38,290.14,45.23,577.72-138.72,292.93-146.52,790.09-216.29,885.67-60.31,82.37,134.42-152.23,138.41-290.44,277.29-184.97,185.87-419.28,118.18-521.1,227.6-669.23,719.24,418.44,978.5,560.33,987.31,575.82,35.77,372.23-305.31,506.07-258.5,131.38,45.94,84.21,409.19-201.81,586.89Z')
// path2.getPolygons()
let path2 = new SvgPath('m4763.71,1550.09c-129.11-1376.26-1120.56-635.3-1202.54-555.26-81.99,80.04-327.97,250.11-306.1,30.01,21.87-220.1,708.92-517.98,352.61-839.85-482.34-435.74-957.45,31.75-1264.21,71.99-583.35,76.53-998.3-115.71-1484.34-112.85C297.84,147.45-104.05,197.63,24.61,984.82c126.36,773.15-83.68,1035.87,109.32,1420.67,212.22,423.11,1131.49,785.37,1672.62,285.14,541.14-500.23,365.27-1086.38-11.13-1150.64-123.08-21.01-468.18,87.94-397.03,5.32,195.27-226.77,606.11-14.31,680.2,116.71,275.25,486.79,366.37,1632.3,1847.21,1107.03,577.63-204.89,907.72-474.78,837.91-1218.95Zm-793.26,432.01c-295.18,345.16-649.8,323.34-791.91,23.2-142.12-300.14-798.05-780.36-822.43-780.36s-519.71-587.27-1335.18-147.32c-650.25,350.82-269.76,1006.29,262.37,917.43,92.84-15.5,98.38,60.04,76.52,160.07-21.86,100.05-494.33-92.31-617.83-325.97-108.46-205.2-119.34-236.39-141.95-409.38-39.54-302.61,468.6-494.99,769.23-575.02,300.64-80.04,562.37,106.37,698.69,95.73,362.76-28.32,500.24-205.65,668.32-247.87,281.08-70.59-169.74,16.98-131.68,522.32,20.67,274.41,474.01,770.37,1253.55,200.71,174-127.15,407.47,221.3,112.31,566.47Z');
let pb2 = path2.getPolygons();
console.dir(pb3, { 'maxArrayLength': null });