import { Configuration, OpenAIApi } from "openai"

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

export async function detectFraud(transactionData: any): Promise<boolean> {
  const prompt = `
    Analyze the following transaction for potential fraud:
    Amount: ${transactionData.amount}
    Currency: ${transactionData.currency}
    User ID: ${transactionData.userId}
    Merchant ID: ${transactionData.merchantId}
    Transaction Time: ${transactionData.timestamp}
    User's Average Transaction Amount: ${transactionData.userAvgAmount}
    User's Transaction Frequency: ${transactionData.userFrequency}

    Is this transaction likely to be fraudulent? Respond with 'Yes' or 'No' and a brief explanation.
  `

  const response = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: prompt,
    max_tokens: 100,
  })

  const analysis = response.data.choices[0].text?.trim().toLowerCase()
  return analysis?.startsWith("yes")
}

