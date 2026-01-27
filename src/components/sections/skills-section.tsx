"use client";

import { Card, CardContent } from "@/components/ui/card";

import { TechEffects } from "@/components/ui/tech-effects";
import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Skill {
  name: string;
  level: number;
  category: string;
}

interface PieChartLabelProps {
  cx?: number;
  cy?: number;
  midAngle?: number;
  innerRadius?: number;
  outerRadius?: number;
  percent?: number;
}

const skills: Skill[] = [
  // Frontend
  { name: "Tailwind CSS", level: 90, category: "Frontend" },
  { name: "Next.js", level: 80, category: "Frontend" },
  { name: "JavaScript", level: 70, category: "Frontend" },
  { name: "React", level: 70, category: "Frontend" },
  { name: "TypeScript", level: 60, category: "Frontend" },
  { name: "ShadCN UI", level: 90, category: "Frontend" },
  { name: "React Bits", level: 90, category: "Frontend" },

  // Backend
  { name: "Java", level: 85, category: "Backend" },
  { name: "C#", level: 80, category: "Backend" },
  { name: "Node.js", level: 75, category: "Backend" },
  { name: "Python", level: 70, category: "Backend" },
  { name: "Express", level: 50, category: "Backend" },

  // Database
  { name: "PostgreSQL", level: 85, category: "Database" },
  { name: "SQL Developer", level: 80, category: "Database" },
  { name: "MongoDB", level: 75, category: "Database" },
  { name: "Oracle", level: 70, category: "Database" },

  // Frameworks
  { name: "Spring", level: 75, category: "Frameworks" },
  { name: "ASP.NET", level: 60, category: "Frameworks" },
  { name: ".NET", level: 55, category: "Frameworks" },
  { name: "Entity Framework", level: 55, category: "Frameworks" },

  // Tools
  { name: "Git", level: 85, category: "Tools" },
  { name: "Azure DevOps", level: 70, category: "Tools" },
  { name: "Postman", level: 60, category: "Tools" },
  { name: "Docker", level: 25, category: "Tools" },
];

const categories = ["Frontend", "Backend", "Database", "Frameworks", "Tools"];

// Cores temáticas para cada categoria
const CATEGORY_COLORS = {
  Frontend: {
    primary: "#3b82f6", // blue-500
    gradient: ["#60a5fa", "#3b82f6", "#2563eb", "#1d4ed8", "#1e40af"], // blue gradient
  },
  Backend: {
    primary: "#8b5cf6", // purple-500
    gradient: ["#a78bfa", "#8b5cf6", "#7c3aed", "#6d28d9", "#5b21b6"], // purple gradient
  },
  Database: {
    primary: "#06b6d4", // cyan-500
    gradient: ["#22d3ee", "#06b6d4", "#0891b2", "#0e7490", "#155e75"], // cyan gradient
  },
  Frameworks: {
    primary: "#10b981", // emerald-500
    gradient: ["#34d399", "#10b981", "#059669", "#047857", "#065f46"], // emerald gradient
  },
  Tools: {
    primary: "#f59e0b", // amber-500
    gradient: ["#fbbf24", "#f59e0b", "#d97706", "#b45309", "#92400e"], // amber gradient
  },
};

export function SkillsSection() {
  const getSkillsByCategory = (category: string) => {
    return skills.filter(skill => skill.category === category);
  };

  // Preparar dados radar para Frontend
  const getCategoryRadarData = (category: string) => {
    return getSkillsByCategory(category).map(skill => ({
      skill: skill.name,
      level: skill.level,
      fullMark: 100,
    }));
  };

  // Preparar dados para gráfico de barras
  const getCategoryBarData = (category: string) => {
    return getSkillsByCategory(category).map(skill => ({
      name: skill.name,
      level: skill.level,
    }));
  };

  // Dados fixos para gráfico de área empilhada (Backend)
  const backendTimelineData = [
    {
      name: "2024/1",
      Java: 35,
      "C#": 10,
      "Node.js": 10,
      Express: 10,
      Python: 80,
    },
    {
      name: "2024/2",
      Java: 60,
      "C#": 45,
      "Node.js": 45,
      Python: 80,
      Express: 30,
    },
    {
      name: "2025/1",
      Java: 85,
      "C#": 80,
      "Node.js": 75,
      Python: 70,
      Express: 50,
    },
    {
      name: "2025/2",
      Java: 90,
      "C#": 85,
      "Node.js": 80,
      Python: 75,
      Express: 55,
    },
  ];

  // Preparar dados para stacked area chart (Backend)
  const getStackedAreaData = (category: string) => {
    if (category === "Backend") {
      return backendTimelineData;
    }

    // Para outras categorias, manter comportamento original se necessário
    const categorySkills = getSkillsByCategory(category);
    const dataPoints = ["2024/1", "2024/2", "2025/1", "2025/2"];

    return dataPoints.map(point => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const dataPoint: any = { name: point };
      categorySkills.forEach(skill => {
        // Criar variação aleatória para cada ponto mantendo a proporção do nível
        const variation = Math.random() * 20 - 10; // -10 a +10 de variação
        dataPoint[skill.name] = Math.max(0, skill.level + variation);
      });
      return dataPoint;
    });
  };

  // Preparar dados para gráfico de pizza
  const getCategoryPieData = (category: string) => {
    return getSkillsByCategory(category).map(skill => ({
      name: skill.name,
      value: skill.level,
    }));
  };

  // Renderizar gráfico baseado na categoria
  const renderChart = (category: string, categoryIndex: number) => {
    switch (categoryIndex) {
      case 0: // Frontend - Radar
        return (
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={getCategoryRadarData(category)}>
              <PolarGrid stroke="#475569" />
              <PolarAngleAxis
                dataKey="skill"
                tick={{ fill: "#cbd5e1", fontSize: 11 }}
                tickSize={17}
              />
              <PolarRadiusAxis
                angle={90}
                domain={[10, 100]}
                tick={{ fill: "#94a3b8", fontSize: 10 }}
              />
              <Radar
                name="Nível"
                dataKey="level"
                stroke={CATEGORY_COLORS.Frontend.primary}
                fill={CATEGORY_COLORS.Frontend.primary}
                fillOpacity={0.6}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: `1px solid ${CATEGORY_COLORS.Frontend.primary}`,
                  borderRadius: "8px",
                  color: "#e2e8f0",
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        );

      case 1: // Backend - Stacked Area Chart
        const backendStackedData = getStackedAreaData(category);
        const backendSkills = getSkillsByCategory(category);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const CustomTooltip = ({ active, payload }: any) => {
          if (active && payload && payload.length) {
            return (
              <div
                style={{
                  backgroundColor: "#1e293b",
                  border: `1px solid ${CATEGORY_COLORS.Backend.primary}`,
                  borderRadius: "8px",
                  padding: "10px",
                }}>
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {payload.map((entry: any, index: number) => (
                  <div key={`item-${index}`} style={{ marginBottom: "4px" }}>
                    <span style={{ color: "#e2e8f0" }}>{entry.name}: </span>
                    <span style={{ color: CATEGORY_COLORS.Backend.primary }}>
                      {Math.round(entry.value)}
                    </span>
                  </div>
                ))}
              </div>
            );
          }
          return null;
        };

        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={backendStackedData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis dataKey="name" tick={{ fill: "#cbd5e1", fontSize: 11 }} />
              <YAxis
                domain={[0, 100]}
                type="number"
                allowDataOverflow={false}
                tick={{ fill: "#94a3b8", fontSize: 10 }}
                tickFormatter={value => value.toString()}
              />
              <Tooltip content={<CustomTooltip />} />
              {backendSkills.map((skill, index) => (
                <Area
                  key={`area-${index}`}
                  type="monotone"
                  dataKey={skill.name}
                  stackId="1"
                  stroke={
                    CATEGORY_COLORS.Backend.gradient[
                      index % CATEGORY_COLORS.Backend.gradient.length
                    ]
                  }
                  fill={
                    CATEGORY_COLORS.Backend.gradient[
                      index % CATEGORY_COLORS.Backend.gradient.length
                    ]
                  }
                  fillOpacity={0.7}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        );

      case 2: // Database - Banded Bar Chart
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={getCategoryBarData(category)}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis
                dataKey="name"
                tick={{ fill: "#cbd5e1", fontSize: 11 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fill: "#94a3b8", fontSize: 10 }}
              />
              <Tooltip
                cursor={false}
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: `1px solid ${CATEGORY_COLORS.Database.primary}`,
                  borderRadius: "8px",
                  color: "#e2e8f0",
                }}
              />
              <Bar
                dataKey="level"
                fill={CATEGORY_COLORS.Database.primary}
                radius={[8, 8, 0, 0]}>
                {getCategoryBarData(category).map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      CATEGORY_COLORS.Database.gradient[
                        index % CATEGORY_COLORS.Database.gradient.length
                      ]
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        );

      case 3: // Frameworks - Pie Chart with Customized Label
        const RADIAN = Math.PI / 180;
        const renderCustomizedLabel = ({
          cx,
          cy,
          midAngle,
          innerRadius,
          outerRadius,
          percent,
        }: PieChartLabelProps) => {
          if (
            !cx ||
            !cy ||
            midAngle === undefined ||
            !innerRadius ||
            !outerRadius ||
            !percent
          ) {
            return null;
          }

          const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
          const x = cx + radius * Math.cos(-midAngle * RADIAN);
          const y = cy + radius * Math.sin(-midAngle * RADIAN);

          return (
            <text
              x={x}
              y={y}
              fill="white"
              textAnchor={x > cx ? "start" : "end"}
              dominantBaseline="central"
              fontSize={12}
              fontWeight="bold">
              {`${(percent * 100).toFixed(0)}%`}
            </text>
          );
        };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const CustomFrameworksTooltip = ({ active, payload }: any) => {
          if (active && payload && payload.length) {
            return (
              <div
                style={{
                  backgroundColor: "#1e293b",
                  border: `1px solid ${CATEGORY_COLORS.Frameworks.primary}`,
                  borderRadius: "8px",
                  padding: "10px",
                }}>
                <div>
                  <span style={{ color: "#e2e8f0" }}>{payload[0].name}: </span>
                  <span style={{ color: CATEGORY_COLORS.Frameworks.primary }}>
                    {payload[0].value}
                  </span>
                </div>
              </div>
            );
          }
          return null;
        };

        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={getCategoryPieData(category)}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value">
                {getCategoryPieData(category).map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      CATEGORY_COLORS.Frameworks.gradient[
                        index % CATEGORY_COLORS.Frameworks.gradient.length
                      ]
                    }
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomFrameworksTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        );

      case 4: // Tools - Bar Chart Horizontal
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={getCategoryBarData(category)} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis
                type="number"
                domain={[0, 100]}
                tick={{ fill: "#94a3b8", fontSize: 10 }}
              />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fill: "#cbd5e1", fontSize: 11 }}
                width={100}
              />
              <Tooltip
                cursor={false}
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: `1px solid ${CATEGORY_COLORS.Tools.primary}`,
                  borderRadius: "8px",
                  color: "#e2e8f0",
                }}
              />
              <Bar
                dataKey="level"
                fill={CATEGORY_COLORS.Tools.primary}
                radius={[0, 8, 8, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  return (
    <section
      id="skills"
      className="py-20 bg-background relative tech-pattern overflow-hidden">
      <TechEffects />
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-8">
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              className={category === "Tools" ? "lg:col-span-2" : ""}>
              <Card className="glass-card backdrop-blur-md tech-hover group">
                <CardContent className="p-8 relative">
                  <div className="absolute top-4 right-4 w-2 h-2 bg-blue-500 rounded-full animate-pulse opacity-60"></div>
                  <h3 className="text-2xl font-bold text-gradient mb-6 text-center group-hover:scale-105 transition-transform duration-300">
                    {category === "Frontend"
                      ? "Frontend"
                      : category === "Backend"
                      ? "Backend"
                      : category === "Database"
                      ? "DataBase"
                      : category === "Frameworks"
                      ? "Frameworks"
                      : "Tools"}
                  </h3>

                  {/* Renderizar gráfico apropriado para cada categoria */}
                  {renderChart(category, categoryIndex)}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Seção de aprendizado contínuo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-10 text-center">
          <Card className="glass-card border-blue-500/20 backdrop-blur-md relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
            <CardContent className="p-8 relative z-10">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-2xl mr-4 pulse-tech">
                  🚀
                </div>
                <h3 className="text-2xl font-bold text-gradient">
                  Sempre Aprendendo
                </h3>
              </div>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-center">
                A tecnologia está em constante evolução, e eu também! Atualmente
                estou explorando novas tecnologias e expandindo meus
                conhecimentos.
              </p>

              <div className="flex flex-wrap justify-center gap-3 mt-8">
                {[
                  "Rest API",
                  "Java",
                  "C#",
                  "Spring Boot",
                  "JavaScript",
                  "Next.js",
                  "React",
                  "Prisma>ex",
                  ".NET",
                  "ASP.NET",
                  "Node.js",
                  "Express",
                  "Python",                
                  "SQL Developer",
                  "PostgreSQL",
                ].map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="px-4 py-2 glass-card text-card-foreground rounded-full text-sm border-primary/20 tech-hover cursor-default">
                    {tech}
                  </motion.span>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
