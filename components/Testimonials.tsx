import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const testimonials = [
  {
    name: "John Doe",
    role: "CTO, Tech Innovators",
    content:
      "Precious is an exceptional developer with a keen eye for security. His work on our blockchain project was invaluable.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Jane Smith",
    role: "Lead Developer, CryptoFuture",
    content: "Working with Precious was a game-changer for our team. His expertise in Rust and Solana is unmatched.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Alex Johnson",
    role: "Cybersecurity Manager, SecureNet",
    content:
      "Precious's ethical hacking skills helped us identify and fix critical vulnerabilities. Highly recommended!",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export function Testimonials() {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold mb-4">What People Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <Card key={index}>
            <CardContent className="p-6 space-y-4">
              <p className="italic">"{testimonial.content}"</p>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

