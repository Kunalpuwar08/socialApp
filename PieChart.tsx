import React from 'react';
import { View, Text } from 'react-native';
import { Svg, Path } from 'react-native-svg';

const PieChart = ({ data }) => {
  // Calculate total percentage
  const totalPercentage = data.reduce((sum, item) => sum + item.percentage, 0);

  // Normalize percentages if total exceeds 100%
  const normalizedData =
    totalPercentage > 100
      ? data.map((item) => ({ ...item, percentage: (item.percentage / totalPercentage) * 100 }))
      : data;

  // Recalculate total percentage after normalization
  const newTotalPercentage = normalizedData.reduce((sum, item) => sum + item.percentage, 0);

  // Convert percentages to angles
  let cumulativePercentage = 0;
  const pieData = normalizedData.map((item) => {
    const startAngle = (cumulativePercentage / 100) * 360;
    cumulativePercentage += item.percentage;
    const endAngle = (cumulativePercentage / 100) * 360;
    return {
      percentage: item.percentage,
      color: item.color,
      startAngle,
      endAngle,
    };
  });

  return (
    <View>
      <Svg height="200" width="200">
        {pieData.map((slice, index) => (
          <Path
            key={index}
            d={describeRingArc(100, 100, 80, 60, slice.startAngle, slice.endAngle)} // Adjust innerRadius
            fill={slice.color}
          />
        ))}
      </Svg>

      <Text>Total: {newTotalPercentage}%</Text>
    </View>
  );
};

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

function describeRingArc(x, y, outerRadius, innerRadius, startAngle, endAngle) {
  const innerStart = polarToCartesian(x, y, innerRadius, endAngle);
  const innerEnd = polarToCartesian(x, y, innerRadius, startAngle);
  const outerStart = polarToCartesian(x, y, outerRadius, endAngle);
  const outerEnd = polarToCartesian(x, y, outerRadius, startAngle);

  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

  const pathData = [
    'M',
    outerStart.x,
    outerStart.y,
    'A',
    outerRadius,
    outerRadius,
    0,
    largeArcFlag,
    0,
    outerEnd.x,
    outerEnd.y,
    'L',
    innerEnd.x,
    innerEnd.y,
    'A',
    innerRadius,
    innerRadius,
    0,
    largeArcFlag,
    1,
    innerStart.x,
    innerStart.y,
    'Z',
  ].join(' ');

  return pathData;
}

export default PieChart;
