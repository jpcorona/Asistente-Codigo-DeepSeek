document.getElementById("generateCode").addEventListener("click", async () => {
    const userInput = document.getElementById("userInput").value;
    if (!userInput) return;

    try {
        let response = await fetch("https://api.deepseek.com/v1/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer TU-API"
            },
            body: JSON.stringify({
                "model": "deepseek-coder",
                "prompt": userInput,
                "max_tokens": 200
            })
        });

        if (!response.ok) {
            throw new Error(`Error en la API: ${response.status} ${response.statusText}`);
        }

        let data = await response.json();
        if (!data.choices || !data.choices.length) {
            throw new Error("Respuesta inválida de la API.");
        }

        document.getElementById("output").textContent = data.choices[0].text.trim();
    } catch (error) {
        document.getElementById("output").textContent = "Error al generar código: " + error.message;
    }
});