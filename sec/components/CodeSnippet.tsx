"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"

const codeSnippets = [
  {
    language: "python",
    code: `def fibonacci(n):
    if n <= 1:
        return n
    else:
        return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(10))`,
  },
  {
    language: "javascript",
    code: `const quickSort = (arr) => {
  if (arr.length <= 1) return arr;
  const pivot = arr[0];
  const left = arr.slice(1).filter(x => x < pivot);
  const right = arr.slice(1).filter(x => x >= pivot);
  return [...quickSort(left), pivot, ...quickSort(right)];
};

console.log(quickSort([3, 6, 8, 10, 1, 2, 1]));`,
  },
  {
    language: "rust",
    code: `fn is_prime(n: u32) -> bool {
    if n <= 1 {
        return false;
    }
    for i in 2..=(n as f64).sqrt() as u32 {
        if n % i == 0 {
            return false;
        }
    }
    true
}

fn main() {
    println!("{}", is_prime(17));
}`,
  },
]

export function CodeSnippet() {
  const [currentSnippet, setCurrentSnippet] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSnippet((prev) => (prev + 1) % codeSnippets.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <Card className="w-full overflow-hidden">
      <CardContent className="p-0">
        <pre className="p-4 text-sm overflow-x-auto">
          <code className={`language-${codeSnippets[currentSnippet].language}`}>
            {codeSnippets[currentSnippet].code}
          </code>
        </pre>
      </CardContent>
    </Card>
  )
}

