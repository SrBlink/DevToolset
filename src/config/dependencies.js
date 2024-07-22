var _storage;
var _validator;
var _constant;
var _event;
var _dependencies = StartUp();
var _component = {};
var _page;
var _service = {};

function StartUp() {

    function on() {
        _storage = StorageLocal();
        _validator = Validator();
        _constant = Constants;
        _event = Events;
        _page = Page();
        _service.format = Format();
        _service.decode = Decode();
        _service.convert = Convert();


    }

    return { on }
}