document.addEventListener("keydown", async (event) => {
    if (event.ctrlKey && event.key === "i") { // Atajo Ctrl + I
        let selectedText = window.getSelection().toString();
        if (!selectedText) return;

        try {
            let response = await fetch("https://api.deepseek.com/v1/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer TU-API"
                },
                body: JSON.stringify({
                    "model": "deepseek-coder",
                    "prompt": `Mejora este código:\n${selectedText}`,
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

            alert("Código mejorado:\n" + data.choices[0].text.trim());
        } catch (error) {
            alert("Error al obtener la mejora de código: " + error.message);
        }
    }
});