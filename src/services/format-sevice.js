function Format() {

    function json(data) {
        if (!data) return;

        const jsonFormated = {
            statusSuccess: '',
            value: ''
        }
        try {
            data = JSON.parse(data);
            jsonFormated.statusSuccess = true;
            jsonFormated.value = JSON.stringify(data, null, 3);

        } catch (error) {
            jsonFormated.statusSuccess = false;
            jsonFormated.value = error.message.split("\n")[0];
        }

        return jsonFormated;

    }


    return { json }
}
