
//this function/object takes in parameter of: 
//canvas ctx(context)
//centre x of image
//centre y of image
//width of image
//height of image
//canvas height
//canvas width
//name of object
//image source of the main image
//the image source of the good quality
//the image source of the okay quality
//the image source of the bad quality
function FoodObject(ctx, centreX, centreY, width, height, canvasHeight, canvasWidth, name, src, desc, price)
{
    //recording the ctx of canvas to draw/render
    this.ctx = ctx;

    //assign all parameter
    this.centreX = centreX;
    this.centreY = centreY;
    this.width = width;
    this.height = height;
    this.name = name;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;


//    initialize a variable of display item(to display 3 qualities

    //declare the image of the main icon
    this.image = new Image();
    this.image.src = src;
    this.price = price;
    this.desc = desc;
    this.imageBackground = new Image();
    this.imageBackground.src = "img/bubble.png";


}

FoodObject.prototype.render = function ()
{
    //draw the main image
    this.ctx.drawImage(this.image, this.centreX, this.centreY, this.width, this.height);

    this.ctx.drawImage(this.imageBackground, this.centreX + 70, this.centreY - 5, 240, this.height);

//    this.ctx.fillStyle = "black";
//    this.ctx.font = "11px Times Roman";
//    this.ctx.fillText(this.desc, this.centreX+50, this.centreY);
    var txt = "";

    txt = this.desc;


    var lineheight = 15;
    var lines = txt.split('\n');
    this.ctx.fillStyle = "rgba(0,0,0,1)";
    this.ctx.strokeStyle = 'rgba(255,255,255,0.7)';
    this.ctx.font = "14px Times Roman";
    for (var i = 0; i < lines.length; i++)
    {

        this.ctx.fillText(lines[i], this.centreX + 110, this.centreY + ((i + 1) * lineheight));

    }
    //this.ctx.strokeText(this.name, this.centreX, this.centreY - 5);
    this.ctx.strokeStyle = 'rgba(0,0,0,1)';
    

        this.ctx.strokeText("PRICE: " + this.price + " €", this.canvasWidth - 130, this.centreY + 60);
    
};

//get the centre x
FoodObject.prototype.getX = function ()
{
    return(this.centreX);
};

//get the centre y
FoodObject.prototype.getY = function ()
{
    return(this.centreY);
};

FoodObject.prototype.setY = function (y)
{
    this.centreY = y;
};

//get the width of main image
FoodObject.prototype.getWidth = function ()
{
    return(this.width);
};

//get the height of main image
FoodObject.prototype.getHeight = function ()
{
    return(this.height);
};

FoodObject.prototype.getImage = function ()
{
    return(this.image);
};


//get the name of object
FoodObject.prototype.getName = function ()
{
    return(this.name);
};

FoodObject.prototype.getPrice = function ()
{
    return(this.price);
};


