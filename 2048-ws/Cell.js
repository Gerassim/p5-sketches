function Cell(value) {
    this.val = value;
    this.acceptMerge = true;

    this.colorPalette = [
        new Color('#000000', '#000000'),
        new Color('#1E90FF', '#000000'),
        new Color('#FF00FF', '#000000'),
        new Color('#FFD700', '#000000'),
        new Color('#008000', '#000000'),
        new Color('#98FB98', '#000000'),
        new Color('#FF8C00', '#000000'),
        new Color('#DC143C', '#000000'),
        new Color('#808000', '#000000'),
        new Color('#800080', '#000000'),
        new Color('#FF0000', '#000000'),
    ];

    this.getColor = function () {
        return this.colorPalette[this.val].cellColor;
    };

    this.setVal = function (value) {
        this.val = value;
    };

    this.getText = function () {
        return Math.pow(2, this.val);
    };

    this.isEmpty = function () {
        return !this.val > 0;
    };

    this.getTextColor = function () {
        return this.colorPalette[this.val].textColor;
    }
}