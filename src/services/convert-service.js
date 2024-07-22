function Convert() {

    const nameStates = {
        "AC": "Acre",
        "AL": "Alagoas",
        "AP": "Amapá",
        "AM": "Amazonas",
        "BA": "Bahia",
        "CE": "Ceará",
        "DF": "Distrito Federal",
        "ES": "Espírito Santo",
        "GO": "Goiás",
        "MA": "Maranhão",
        "MT": "Mato Grosso",
        "MS": "Mato Grosso do Sul",
        "MG": "Minas Gerais",
        "PA": "Pará",
        "PB": "Paraíba",
        "PR": "Paraná",
        "PE": "Pernambuco",
        "PI": "Piauí",
        "RJ": "Rio de Janeiro",
        "RN": "Rio Grande do Norte",
        "RS": "Rio Grande do Sul",
        "RO": "Rondônia",
        "RR": "Roraima",
        "SC": "Santa Catarina",
        "SP": "São Paulo",
        "SE": "Sergipe",
        "TO": "Tocantins"
    };


    function state(data) {

        if (!data) return;

        const listStates = data.split('\n').map(item => item.toUpperCase());

        const convertedStates = {
            statusSuccess: '',
            value: '',
        }

        try {
            convertedStates.value = listStates.map(state => nameStates[state]).join('\n');
            convertedStates.statusSuccess = true;
        } catch (error) {
            convertedStates.statusSuccess = false;
            convertedStates.value = error.message;
        }

        return convertedStates;

    }


    return { state }
}