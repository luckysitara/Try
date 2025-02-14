import { Progress } from "@/components/ui/progress"
import { DownloadCV } from "@/components/DownloadCV"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Bio() {
  const skills = [
    { name: "Rust", level: 90 },
    { name: "Solana", level: 85 },
    { name: "Ethical Hacking", level: 95 },
    { name: "Python", level: 80 },
    { name: "React", level: 75 },
  ]

  const experiences = [
    {
      title: "Ethical Hacker & Backend Developer",
      company: "Netisens ICT",
      period: "May 2023 - Present",
      description:
        "Implemented robust security measures through penetration testing. Contributed to backend development projects.",
    },
    {
      title: "CEO & Founder",
      company: "Bugacademy, Solpay",
      period: "2022 - Present",
      description: "Developed Solpay, a crypto payment gateway. Established and managed an e-learning platform.",
    },
  ]

  const certifications = [
    "Alx Africa Software Engineering Certification (2024)",
    "Google Coursera Cyber Security Certification (2023)",
    "Advent of Cyber (2023)",
    "AI Career Essential (ALX Africa)",
    "Blockchain Engineer (in progress)",
  ]

  return (
    <div className="space-y-12 animate-fadeIn">
      <section>
        <h1 className="text-4xl font-bold mb-4">About Me</h1>
        <p className="text-lg mb-4">
          I'm a highly skilled cybersecurity expert and blockchain developer with a passion for creating secure and
          innovative solutions. With expertise in Ethical Hacking, Penetration Testing, and Smart Contract Security, I
          bring a unique blend of offensive and defensive security knowledge to my work.
        </p>
        <p className="text-lg mb-8">
          Currently, I'm expanding my skills in Rust and Solidity, focusing on blockchain development and smart contract
          security. I'm always eager to take on new challenges and contribute to cutting-edge projects in the tech
          industry.
        </p>
        <DownloadCV />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Skills</h2>
        <div className="space-y-4">
          {skills.map((skill, index) => (
            <div key={index}>
              <div className="flex justify-between mb-1">
                <span>{skill.name}</span>
                <span>{skill.level}%</span>
              </div>
              <Progress value={skill.level} className="w-full" />
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Experience</h2>
        <div className="space-y-4">
          {experiences.map((exp, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{exp.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-semibold">{exp.company}</p>
                <p className="text-sm text-muted-foreground">{exp.period}</p>
                <p className="mt-2">{exp.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Certifications</h2>
        <ul className="list-disc list-inside space-y-2">
          {certifications.map((cert, index) => (
            <li key={index}>{cert}</li>
          ))}
        </ul>
      </section>
    </div>
  )
}

