function Page() {
    const selectors = {
        selectTools: {
            element: doc.q('.select-type-tools'),
            clear: () => { doc.q('.select-type-tools').valeu = '' }
        },
        inputEntry: {
            element: doc.q('.text-area-input-entrada'),
            clear: () => { doc.q('.text-area-input-entrada').value = '' }
        },
        inputExit: {
            element: doc.q('.text-area-input-saida'),
            clear: () => { doc.q('.text-area-input-saida').value = '' }
        },
        buttonPaste: {
            element: doc.q('#icon-paste-text-area'),
        },
        buttonCopy: {
            element: doc.q('#icon-copy-text-area'),
        },
        labelError: {
            element: doc.q('.label-btn-submit'),
            clear: () => { doc.q('.label-btn-submit').innerText = '' }
        },
        buttonSubmit: {
            element: doc.q('.btn-submit'),
        },
        iconCopied: {
            element: doc.q('#icon-copied-text-area'),
        }
    };

    const actionSelect = {
        "formatarjson": {
            text: 'Formatar',
            execute: (data) => _service.format.json(data)
        },
        "utf8": {
            text: 'Decodificar',
            execute: (data) => _service.decode.utf8(data)
        },

    }

    function on() {
        onEvent();
        addListeners();
    }

    function onEvent() {
        console.log("registrando eventos ...")
        selectors.selectTools.element.event('change', (event) => {
            clearFields();
            handleTextButtonSubmit(event);
        });
        selectors.buttonSubmit.element.event('click', handleButtonSubmit)
        selectors.buttonCopy.element.event('click', handleButtonCopy)
        selectors.buttonPaste.element.event('click', handleButtonPaste)
        selectors.inputEntry.element.event('change', handleInputTextAreaEntry)
    }

    function handleTextButtonSubmit(event) {
        const selectValue = event.target.value;
        selectors.buttonSubmit.element.innerText = actionSelect[selectValue].text;
    }

    function handleButtonSubmit(event) {
        const toolSelect = selectors.selectTools.element.value;
        const entryValue = selectors.inputEntry.element.value

        const jsonFormated = actionSelect[toolSelect].execute(entryValue);

        if (jsonFormated.statusSuccess) {
            selectors.inputExit.element.value = jsonFormated.value;
            selectors.labelError.clear();
        } else {
            selectors.inputExit.element.value = '';
            selectors.labelError.element.innerText = jsonFormated.value;
        }

    }

    function handleInputTextAreaEntry(event) {
        selectors.inputExit.clear();
        selectors.labelError.clear();
    }

    function clearFields() {
        selectors.inputEntry.clear();
        selectors.inputExit.clear();
        selectors.labelError.clear();
    }

    async function handleButtonPaste() {
        const valueTransferArea = await navigator.clipboard.readText();
        selectors.inputEntry.element.value = valueTransferArea;

        selectors.inputExit.clear();
        selectors.labelError.clear();
    }

    async function handleButtonCopy() {
        await navigator.clipboard.writeText(selectors.inputExit.element.value);
        toggleCopiedButton(true);
    }

    function toggleCopiedButton(active) {
        if (!active) {
            selectors.buttonCopy.element.classList.add('active');
            selectors.iconCopied.element.classList.remove('active');
            return;
        };

        selectors.buttonCopy.element.classList.remove('active')
        selectors.iconCopied.element.classList.add('active')

        setTimeout(() => { toggleCopiedButton(false) }, 1000)

    }

    function addListeners() { }

    return { on }
}