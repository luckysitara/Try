import { Progress } from "@/components/ui/progress"

const skills = [
  { name: "Rust", level: 90 },
  { name: "Solana", level: 85 },
  { name: "Ethical Hacking", level: 95 },
  { name: "Python", level: 80 },
  { name: "React", level: 75 },
]

export function SkillsProgress() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold mb-4">Skills</h2>
      {skills.map((skill, index) => (
        <div key={index} className="space-y-2">
          <div className="flex justify-between">
            <span className="font-medium">{skill.name}</span>
            <span>{skill.level}%</span>
          </div>
          <Progress value={skill.level} className="h-2" />
        </div>
      ))}
    </div>
  )
}

