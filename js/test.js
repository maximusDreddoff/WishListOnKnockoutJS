/**
 * Created by MaksimNadolsky on 12-Jan-16.
 */
var bookModel = function (books) {
    var self = this;
    var rowId;
    self.books = ko.observableArray(books);

    var calculate = self.total = ko.computed(function () {
        var total = 0;
        for (var i = 0; i < self.books().length; i++) {
            total = total + +self.books()[i].price;
        }
        return total;
    });


    self.addBook = function () {
        self.books.push({
            name: '',
            author: '',
            genre: '',
            price: ''
        });
        calculate();
    };

    self.removeBook = function (book) {
        self.books.remove(book);
        rowId = book.name;
        console.log(rowId);
        updateLocalStorage();
        calculate();
    };


    function updateLocalStorage() {
        var localBook = JSON.parse(localStorage['table']);
        for (var i = 0; i < localBook.length; i++) {
            if (localBook[i].name == rowId) {
                localBook.splice(i, 1);
                localStorage.setItem("table", JSON.stringify(localBook));
                break;
            }
        }
    }


    self.save = function () {
        localStorage.setItem("table", JSON.stringify(books));
        calculate();
    };
};


if (localStorage['table'] == '[]') {
    localStorage.clear();
}

if (localStorage['table'] !== undefined) {
    var local = JSON.parse(localStorage['table']);
    var viewModel = new bookModel(local);

}
else {
    var viewModel = new bookModel(books);
    localStorage.setItem("table", JSON.stringify(self.books));
}
ko.applyBindings(viewModel);
