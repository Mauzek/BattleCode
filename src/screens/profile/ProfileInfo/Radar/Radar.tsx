import { useMemo } from 'react';
import styles from './Radar.module.scss';

interface RadialChartProps {
  data: {
    readability: number;
    efficiency: number;
    scalability: number;
    reliability: number;
    maintainability: number;
  };
  size?: number;
}

const RadialChart: React.FC<RadialChartProps> = ({ 
  data, 
  size = 200 
}) => {
  const chartData = useMemo(() => {
    const metrics = [
      { name: 'Читаемость', value: data.readability, angle: 0 },
      { name: 'Эффективность', value: data.efficiency, angle: 72 },
      { name: 'Масштабируемость', value: data.scalability, angle: 144 },
      { name: 'Надёжность', value: data.reliability, angle: 216 },
      { name: 'Сопровождаемость', value: data.maintainability, angle: 288 },
    ];

    // Преобразуем значения в координаты (0-5 в радиус 0-80% от центра)
    const maxValue = 5;
    const radius = size * 0.4; // 80% от половины размера

    return metrics.map(metric => {
      const valueRadius = (metric.value / maxValue) * radius;
      const angleInRad = (metric.angle * Math.PI) / 180;
      
      return {
        ...metric,
        x: size / 2 + valueRadius * Math.sin(angleInRad),
        y: size / 2 - valueRadius * Math.cos(angleInRad),
        valueRadius,
        maxRadius: radius
      };
    });
  }, [data, size]);

  // Создаем path для пятиугольника
  const polygonPath = useMemo(() => {
    const points = chartData.map(point => `${point.x},${point.y}`).join(' ');
    return points;
  }, [chartData]);

  // Создаем path для сетки (внешний пятиугольник)
  const gridPath = useMemo(() => {
    const radius = size * 0.4;
    const points = chartData.map(point => {
      const angleInRad = (point.angle * Math.PI) / 180;
      const x = size / 2 + radius * Math.sin(angleInRad);
      const y = size / 2 - radius * Math.cos(angleInRad);
      return `${x},${y}`;
    }).join(' ');
    return points;
  }, [chartData, size]);

  // Создаем круги для каждого значения
  const valueCircles = useMemo(() => {
    return chartData.map((point, index) => (
      <circle
        key={index}
        cx={point.x}
        cy={point.y}
        r={4}
        fill="#007bff"
        className={styles.valueCircle}
      />
    ));
  }, [chartData]);

  // Создаем линии сетки от центра к вершинам
  const gridLines = useMemo(() => {
    return chartData.map((point, index) => {
      const angleInRad = (point.angle * Math.PI) / 180;
      const x = size / 2 + point.maxRadius * Math.sin(angleInRad);
      const y = size / 2 - point.maxRadius * Math.cos(angleInRad);
      
      return (
        <line
          key={index}
          x1={size / 2}
          y1={size / 2}
          x2={x}
          y2={y}
          stroke="#e0e0e0"
          strokeWidth="1"
          className={styles.gridLine}
        />
      );
    });
  }, [chartData, size]);

  // Создаем концентрические круги
  const concentricCircles = useMemo(() => {
    const circles = [];
    const radius = size * 0.4;
    
    for (let i = 1; i <= 5; i++) {
      const circleRadius = (radius / 5) * i;
      circles.push(
        <circle
          key={i}
          cx={size / 2}
          cy={size / 2}
          r={circleRadius}
          fill="none"
          stroke="#f0f0f0"
          strokeWidth="1"
          className={styles.concentricCircle}
        />
      );
    }
    
    return circles;
  }, [size]);

  // Подписи для метрик
  const labels = useMemo(() => {
    const labelRadius = size * 0.45;
    
    return chartData.map((point, index) => {
      const angleInRad = (point.angle * Math.PI) / 180;
      const x = size / 2 + labelRadius * Math.sin(angleInRad);
      const y = size / 2 - labelRadius * Math.cos(angleInRad);
      
      // Выравнивание текста
      const textAnchor = 
        point.angle === 0 ? 'middle' :
        point.angle < 180 ? 'start' : 'end';
      
      const dy = point.angle === 0 ? -5 : point.angle === 180 ? 15 : 0;

      return (
        <g key={index}>
          <text
            x={x}
            y={y}
            textAnchor={textAnchor}
            dy={dy}
            className={styles.metricLabel}
          >
            {point.name}
          </text>
          {/* <text
            x={x}
            y={y}
            textAnchor={textAnchor}
            dy={dy + 15}
            className={styles.valueLabel}
          >
            {point.value}/5
          </text> */}
        </g>
      );
    });
  }, [chartData, size]);

  return (
    <div className={styles.container}>
      <svg 
        width={size} 
        height={size} 
        viewBox={`0 0 ${size} ${size}`}
        className={styles.chart}
      >
        {/* Концентрические круги */}
        {concentricCircles}
        
        {/* Линии сетки */}
        {gridLines}
        
        {/* Внешний пятиугольник (сетка) */}
        <polygon
          points={gridPath}
          fill="none"
          stroke="#ccc"
          strokeWidth="1"
          className={styles.outerPolygon}
        />
        
        {/* Заполненный пятиугольник данных */}
        <polygon
          points={polygonPath}
          fill="rgba(0, 123, 255, 0.2)"
          stroke="#007bff"
          strokeWidth="2"
          className={styles.dataPolygon}
        />
        
        {/* Точки значений */}
        {valueCircles}
        
        {/* Подписи */}
        {labels}
        
        {/* Центральная точка */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={2}
          fill="#007bff"
          className={styles.centerCircle}
        />
      </svg>
    </div>
  );
};

export default RadialChart;