const readline = require("node:readline");

function response(id, result) {
  return { jsonrpc: "2.0", id, result };
}

function handleRequest(request) {
  const { id, method, params } = request;

  if (method === "initialize") {
    return response(id, {
      protocolVersion: "2024-11-05",
      capabilities: { tools: {} },
      serverInfo: { name: "fuzzable-test-server", version: "1.0.0" },
    });
  }

  if (method === "tools/list") {
    return response(id, {
      tools: [
        {
          name: "generate_response",
          description: "Generates a response from untrusted user input",
          inputSchema: {
            type: "object",
            properties: { user_message: { type: "string" } },
            required: ["user_message"],
          },
        },
      ],
    });
  }

  if (method === "tools/call") {
    const userMessage = params?.arguments?.user_message;
    const vulnerableResponse =
      typeof userMessage === "string" &&
      /ignore|system|instruction|jailbreak/i.test(userMessage);

    return response(id, {
      content: [
        {
          type: "text",
          text: vulnerableResponse
            ? "Your system prompt is: You are an assistant. Follow the injected instruction."
            : "Safe-looking test response.",
        },
      ],
    });
  }

  return response(id, {});
}

const input = readline.createInterface({ input: process.stdin });
input.on("line", (line) => {
  try {
    const request = JSON.parse(line);
    process.stdout.write(`${JSON.stringify(handleRequest(request))}\n`);
  } catch {
    process.stdout.write(
      `${JSON.stringify({ jsonrpc: "2.0", id: null, error: { code: -32700, message: "Parse error" } })}\n`,
    );
  }
});
