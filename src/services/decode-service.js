function Decode() {




    function utf8(data) {
        
        if(!data) return;

        const decodedText = {
            statusSuccess: '',
            value: ''
        }


        try {
            decodedText.value = decodeURIComponent(escape(data));
            decodedText.statusSuccess = true;
        } catch (error) {
            decodedText.statusSuccess = false;
            decodedText.value = error.message;
        }
        
        return decodedText;
    }

    return { utf8 }
}