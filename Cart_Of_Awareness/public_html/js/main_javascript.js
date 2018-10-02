//canvas width and height
var CANVAS_WIDTH = 355;
var CANVAS_HEIGHT = 620;

//4 arrays of type foods

var yogurts = [];
var beans = [];
var juice = [];
var lasagna = [];

//kart for listing the choices of each type of food
var kart = [];

//icon image for choosing the types of foods
var yogurtImage = new Image();
yogurtImage.src = "img/yogurt.png";
var beanImage = new Image();
beanImage.src = "img/bean.png";
var juiceImage = new Image();
juiceImage.src = "img/juice.png";
var lasagnaImage = new Image();
lasagnaImage.src = "img/lasagna.png";

//back&foward arrow image
var backArrow = new Image();
backArrow.src = "img/backArrow.png";
var fowardArrow = new Image();
fowardArrow.src = "img/fowardArrow.png";

//background shelf image
var background = new Image();
background.src = "img/background.jpg";

//blackboard for budget image
var budgetBackground = new Image();
budgetBackground.src = "img/budget.png";

//paper for kartBackground
var kartBackground = new Image();
kartBackground.src = "img/paper.png";

//notes image for results and statistic
var paper = new Image();
paper.src = "img/notes.png";

//review button (wooden plank)
var button = new Image();
button.src = "img/review.png";

//cashier image
var cashier = new Image();
cashier.src = "img/cashier.png";

var TitleButton = new Image();
TitleButton.src = "img/TitleButton.png";

var GameLogo = new Image();
GameLogo.src = "img/logo.png";

var stud = new Image();
stud.src = "img/stud.png";

var team = new Image();
team.src = "img/teamLogo.png";

var cs = new Image();
cs.src = "img/cs.png";

var goldLabel = new Image();
goldLabel.src = "img/label.png";
//image width and height (for icons)
var imageWidth = 100;
var imageHeight = 100;
//initial budget
var budget = 13;
var mainMenu = true;

//levels
var shopping = false;
var result = false;
var review = false;
var endScreen = false;

//scene inside the shopping levels
var shoppingScene = [];
var reviewScene = [];

//if the player overbudget
var fail = false;

window.onload = onAllAssetsLoaded;
document.write("<div id='loadingMessage'>Loading...</div>");
function onAllAssetsLoaded()
{
    //ignore this part, this part is for Cordova(the mobile apps)
    /*document.addEventListener("deviceready", onDeviceReady, false);
     }
     
     function onDeviceReady()
     {*/


    //loading message when the page is loading
    document.getElementById('loadingMessage').style.visibility = "hidden";

    //building the canvas
    canvas = document.getElementById("canvas");
    //getting the context of canvas adn assigning canvas width and height
    ctx = canvas.getContext("2d");
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    document.getElementById('canvas').style.marginLeft = "" + (screen.width - canvas.width) / 2 + "px";


    //declaring and assigning yogurts, beans, juices, and lasagne

    yogurts[0] = new FoodObject(ctx, 30, 190, 80, 80, CANVAS_HEIGHT, CANVAS_WIDTH, "Yogurt", "img/y.png", "This yogurt is in perfect condition\nExpiry date is on 2 weeks", 1);
    yogurts[1] = new FoodObject(ctx, 30, 320, 80, 80, CANVAS_HEIGHT, CANVAS_WIDTH, "Yogurt", "img/y.png", "This yogurt is going to\nexpire in 1 week", 0.5);
    yogurts[2] = new FoodObject(ctx, 30, 445, 80, 80, CANVAS_HEIGHT, CANVAS_WIDTH, "Yogurt", "img/y.png", "This yogurt is going to\nexpire tonight", 0);

    beans[0] = new FoodObject(ctx, 30, 165, 80, 80, CANVAS_HEIGHT, CANVAS_WIDTH, "Local Beans", "img/b3.png", "Local Bean,\nstraight from your local farmers", 8.7);
    beans[1] = new FoodObject(ctx, 30, 280, 80, 80, CANVAS_HEIGHT, CANVAS_WIDTH, "Belgium Beans", "img/b2.png", "Belgium's beans,\n2 days from field to your plate", 8.7);
    beans[2] = new FoodObject(ctx, 30, 380, 80, 80, CANVAS_HEIGHT, CANVAS_WIDTH, "Kenia Beans", "img/b1.png", "Perfectly packed beans,\nall the way from Kenia", 6.22);
    beans[3] = new FoodObject(ctx, 30, 480, 50, 80, CANVAS_HEIGHT, CANVAS_WIDTH, "Canned Beans", "img/b4.png", "Canned beans,\nhygenic, cheap, and also practical", 4.48);

    juice[0] = new FoodObject(ctx, 30, 170, 30, 80, CANVAS_HEIGHT, CANVAS_WIDTH, "Local Juice", "img/j3.png", "Local apple juice,\nfrom freshly picked apples\nfrom your local farms ", 1.9);
    juice[1] = new FoodObject(ctx, 30, 270, 30, 80, CANVAS_HEIGHT, CANVAS_WIDTH, "Fair Trade Juice", "img/j2.png", "Fair trade apple juice,\nfrom South African apples", 1.85);
    juice[2] = new FoodObject(ctx, 30, 380, 30, 80, CANVAS_HEIGHT, CANVAS_WIDTH, "Biological Juice", "img/j1.png", "Biological apple juice,\nmade from biological grown apples", 1.66);
    juice[3] = new FoodObject(ctx, 30, 485, 30, 80, CANVAS_HEIGHT, CANVAS_WIDTH, "Home Brand Juice", "img/j4.png", "Home brand apple juice,\nthe cheapest out there", 1.08);

    lasagna[0] = new FoodObject(ctx, 30, 170, 90, 80, CANVAS_HEIGHT, CANVAS_WIDTH, "Fresh Beef Lasagna", "img/l4.png", "Fresh and warm beef lasagne", 7);
    lasagna[1] = new FoodObject(ctx, 30, 280, 90, 80, CANVAS_HEIGHT, CANVAS_WIDTH, "Vegetable Lasagna", "img/l1.png", "Fresh vegetarian lasagne,\nhealthy and good for environment", 4.13);
    lasagna[2] = new FoodObject(ctx, 30, 380, 90, 80, CANVAS_HEIGHT, CANVAS_WIDTH, "Insect Lasagna", "img/l3.png", "Insect lasagne,\nhealthy and cheap",  3);
    lasagna[3] = new FoodObject(ctx, 30, 485, 90, 80, CANVAS_HEIGHT, CANVAS_WIDTH, "Pork Lasagna", "img/l2.png", "Pork lasagne\nthe cheapest out there", 2.30);


    shoppingScene[0] = true;
    //render the canvas
    renderCanvas();
    //add a event listener (click)
    canvas.addEventListener('click', clickHandler);

}

function renderCanvas()
{
    //request the animation frame everytime its free
    requestAnimationFrame(renderCanvas);

    //clear all the image that is already on the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //draw then image background
    ctx.drawImage(background, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT + 200);


    //if the current level is shopping
    if (mainMenu)
    {

        ctx.drawImage(budgetBackground, CANVAS_WIDTH / 70 * 6, (CANVAS_HEIGHT / 130 * 5), ((CANVAS_WIDTH / 70) * 62), ((CANVAS_HEIGHT / 130) * 25));
        ctx.drawImage(GameLogo,CANVAS_WIDTH/5,(CANVAS_HEIGHT/130*18)*0.45,80,80);
        ctx.drawImage(button, CANVAS_WIDTH / 5.6, (CANVAS_HEIGHT / 130 * 18) * 1.9, ((CANVAS_WIDTH / 5.6) * 3.6), (CANVAS_HEIGHT / 130 * 18));
        ctx.drawImage(button, CANVAS_WIDTH / 5.6, (CANVAS_HEIGHT / 130 * 18) * 5.1, ((CANVAS_WIDTH / 5.6) * 3.6), (CANVAS_HEIGHT / 130 * 18));
        ctx.drawImage(stud,CANVAS_WIDTH/1.3,(CANVAS_HEIGHT/130*18)*6.6,80,50);
        ctx.drawImage(team,CANVAS_WIDTH/1.45,(CANVAS_HEIGHT/130*18)*6.6,50,50);
        ctx.drawImage(cs,CANVAS_WIDTH/1.9,(CANVAS_HEIGHT/130*18)*6.6,60,50);
        ctx.fillStyle = 'rgba(255,255,255,0.8)';
        ctx.font = "24px Times Roman";
        ctx.strokeStyle = 'rgba(255,255,255,0.8)';
        ctx.strokeText("CART ", 195, 55);
        ctx.strokeText("OF", 210, 85);
        ctx.strokeText("AWARENESS", 160, 115);
        this.ctx.fillStyle = "#fff";
        this.ctx.font = "24px Times Roman";
        ctx.strokeStyle = '#000';
        ctx.strokeText("PLAY", CANVAS_WIDTH / 2.5, (CANVAS_HEIGHT / 130 * 18) * 2.5);

        ctx.strokeText("EXIT", CANVAS_WIDTH / 2.5, (CANVAS_HEIGHT / 130 * 18) * 5.7);
    } else if (shopping)
    {
        //the main menu of the shopping level
        if (shoppingScene[0])
        {
            //draw the four image icon of food tyes
            ctx.drawImage(yogurtImage, 40, 160, imageWidth, imageHeight);
            ctx.drawImage(beanImage, 200, 165, imageWidth, imageHeight);
            ctx.drawImage(juiceImage, 70, 285, 40, imageHeight);
            ctx.drawImage(lasagnaImage, 200, 300, imageWidth, imageHeight);
            ctx.drawImage(goldLabel, 30, 225, 130, 50);
            ctx.drawImage(goldLabel, 190, 225, 130, 50);
            ctx.drawImage(goldLabel, 30, 360, 130, 50);
            ctx.drawImage(goldLabel, 190, 360, 130, 50);
            //draw the cashier
            ctx.drawImage(cashier, 70, 420, 200, 200);

            this.ctx.fillStyle = "#fff";
            this.ctx.font = "20px Times Roman";
            ctx.strokeStyle = '#000';
            ctx.strokeText("YOGURT", 55, 265);
            ctx.strokeText("BEANS", 225, 265);
            ctx.strokeText("JUICE", 65, 400);
            ctx.strokeText("LASAGNE", 210, 400);
            //generating the text "Pay"
            ctx.fillStyle = 'rgba(0,0,0,1)';
            ctx.font = "30px Times Roman";
            ctx.strokeStyle = 'rgba(0,0,0,1)';
            ctx.fillText("Pay", 140, 570);

        } else if (shoppingScene[1])
        {//yogurts scene

            //draw a different background on top of the another background
            //so the background shelf fits to the food placement
            ctx.drawImage(background, 0, 140, CANVAS_WIDTH, CANVAS_HEIGHT + 200);
            //render all of the yogurts
            render(yogurts, false);
            //draw the back arrow
            ctx.drawImage(backArrow, CANVAS_WIDTH - 80, CANVAS_HEIGHT - 80, 70, 70);
            ctx.fillStyle = 'rgba(255,255,255,1)';
            ctx.font = "24px Times Roman";
            ctx.strokeStyle = 'rgba(0,0,0,1)';
            ctx.fillText("Shop", CANVAS_WIDTH - 70, CANVAS_HEIGHT - 10);

        } else if (shoppingScene[2])
        {//beans scene

            //draw a different background on top of the another background
            //so the background shelf fits to the food placement
            ctx.drawImage(background, 0, 140, CANVAS_WIDTH, CANVAS_HEIGHT + 50);
            //render all the beans
            render(beans, false);
            //draw back arrow
            ctx.drawImage(backArrow, CANVAS_WIDTH - 80, CANVAS_HEIGHT - 80, 70, 70);
            ctx.fillStyle = 'rgba(255,255,255,1)';
            ctx.font = "24px Times Roman";
            ctx.strokeStyle = 'rgba(0,0,0,1)';
            ctx.fillText("Shop", CANVAS_WIDTH - 70, CANVAS_HEIGHT - 10);

        } else if (shoppingScene[3])
        {//juice scene

            //draw a different background on top of the another background
            //so the background shelf fits to the food placement
            ctx.drawImage(background, 0, 140, CANVAS_WIDTH, CANVAS_HEIGHT + 50);
            //render all the juices
            render(juice, false);
            //draw back arrow
            ctx.drawImage(backArrow, CANVAS_WIDTH - 80, CANVAS_HEIGHT - 80, 70, 70);
            ctx.fillStyle = 'rgba(255,255,255,1)';
            ctx.font = "24px Times Roman";
            ctx.strokeStyle = 'rgba(0,0,0,1)';
            ctx.fillText("Shop", CANVAS_WIDTH - 70, CANVAS_HEIGHT - 10);

        } else if (shoppingScene[4])
        {//lasagne scene

            //draw a different background on top of the another background
            //so the background shelf fits to the food placement
            ctx.drawImage(background, 0, 140, CANVAS_WIDTH, CANVAS_HEIGHT + 50);
            //render all the lasagne
            render(lasagna, false);
            //draw back arrow
            ctx.drawImage(backArrow, CANVAS_WIDTH - 80, CANVAS_HEIGHT - 80, 70, 70);
            ctx.fillStyle = 'rgba(255,255,255,1)';
            ctx.font = "24px Times Roman";
            ctx.strokeStyle = 'rgba(0,0,0,1)';
            ctx.fillText("Shop", CANVAS_WIDTH - 70, CANVAS_HEIGHT - 10);

        }

        //draw the budget and kart background
        ctx.drawImage(budgetBackground, 235, 10, CANVAS_WIDTH / 3, 135);
        ctx.drawImage(paper, 0, 10, CANVAS_WIDTH - 110, 125);

        //generating "Budget: " text
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.font = "19px Times Roman";
        ctx.strokeStyle = 'rgba(255,255,255,0.5)';
        ctx.strokeText("Budget: ", 245, 40);

        //printing the initial budget
        ctx.strokeText(budget + " €", 260, 60);

        //printing the kart list
        kartList();
    } else if (result)
    {//the result level


        var total = 0;
        var profit = 0;

        //printing the title "RESULT" on the very top of screen
        ctx.fillStyle = 'rgba(255,255,255,0.8)';
        ctx.font = "36px Times Roman";
        ctx.strokeStyle = 'rgba(255,255,255,0.8)';
        //drawing the budget background(chalkBoard) first before printing the "RESULT"
        ctx.drawImage(budgetBackground, 20, 10, CANVAS_WIDTH - 20, 130);
        //printing "RESULT"
        ctx.strokeText("RESULT", 110, 80);
        //preparing for the next text
        this.ctx.fillStyle = "#fff";
        this.ctx.font = "16px Times Roman";
        ctx.strokeStyle = '#000';
        //drawing paper(note image) for the resultsBackground
        ctx.drawImage(paper, 25, 170, CANVAS_WIDTH - 50, 250);

        //printing the list of items that the player buys
        for (var i = 0; i < kart.length; i++)
        {
            ctx.strokeText(kart[i].getName(), 70, 210 + (i * 20));
            ctx.strokeText(" : " + kart[i].getPrice() + " €", 240, 210 + (i * 20));
            //getting the total price
            total += kart[i].getPrice();
        }
        //getting how many money left
        profit = budget - total;

        //printing the initial budget 
        ctx.strokeText("Budget: ", 60, 300);
        ctx.strokeText(budget + " €", 70, 320);

        //priting how much money you spent
        ctx.strokeText("Total Spent: ", 120, 300);
        ctx.strokeText(total.toFixed(2) + " €", 130, 320);

        ctx.strokeText("Money Left: ", 210, 300);

        ctx.drawImage(button, 80, 430, CANVAS_WIDTH / 2, 100);
        ctx.strokeText("MAIN MENU", 120, 485);
        //printing different things based on total spent compared to the budget
        if (total > budget)
        {
            fail = true;
            ctx.fillStyle = 'rgba(255,0,0,1)';
            ctx.strokeStyle = 'rgba(255,0,0,1)';
            ctx.strokeText("Your total spent exceed your budget!! ", 50, 350);
            ctx.strokeText("Choose your item carefully!!", 70, 370);


        } else
        {
            fail = false;
            ctx.strokeText("You got all the items within budget!!", 60, 350);
            ctx.strokeText("Are you sure you made the best choices?", 45, 370);
            
            ctx.strokeStyle = 'rgba(212,175,55,1)';
        }

        //print how much money left

        ctx.strokeText(profit.toFixed(2) + " €", 220, 320);

    } 
    //checking the correct shoppingScene

    //icon for choosing the type the ingredients

    //generating the kart

}

function render(object, review)
{
    //call render function for every object
    for (var i = 0; i < object.length; i++)
    {
        object[i].render(review);
    }
}

function listing()
{

    for (var i = 0; i < kart.length; i++)
    {
        kart[i].setY(160);
    }
}

function kartList()
{
    //create a red rectangle for the kart background

    //kart text
    var total = 0;
    this.ctx.fillStyle = "#fff";
    this.ctx.font = "16px Times Roman";
    ctx.strokeStyle = '#000';
    ctx.strokeText("Cart: ", 20, 35);
    //ctx.fillStyle("Kart: ", 20, 35);
    //printing the chosen fruit
    for (var i = 0; i < kart.length; i++)
    {
        if (kart[i] == null)
        {
            ctx.strokeText(" ", 20, 50 + (i * 20));
        } else
        {
            ctx.strokeText(kart[i].getName(), 30, 60 + (i * 20));
            ctx.strokeText(" : " + kart[i].getPrice() + " €", 170, 60 + (i * 20));
            total += kart[i].getPrice();
        }
    }

    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.strokeStyle = 'rgba(255,255,255,0.5)';
    ctx.font = "19px Times Roman";
    ctx.strokeText("Total Spent: ", 245, 85);
    if (total > budget)
    {
        ctx.fillStyle = 'rgba(200,50,50,0.8)';
        ctx.strokeStyle = 'rgba(200,50,50,0.8)';

    }

    ctx.strokeText(total.toFixed(2) + " €", 260, 110);
}

function clickHandler(e)
{
    //if left click
    if (e.which === 1)
    {
        //recording the position of your mouse x and y wise
        var canvasBoundingRectangle = canvas.getBoundingClientRect();
        mouseX = e.clientX - canvasBoundingRectangle.left;
        mouseY = e.clientY - canvasBoundingRectangle.top;
        if (mainMenu)
        {
            if (mouseIsInsideImage(CANVAS_WIDTH / 5.6, (CANVAS_HEIGHT / 130 * 18) * 1.9, ((CANVAS_WIDTH / 5.6) * 3.6), (CANVAS_HEIGHT / 130 * 18), mouseX, mouseY))
            { //yogurt list
                shopping = true;
                mainMenu = false;
            } else if (mouseIsInsideImage(CANVAS_WIDTH / 5.6, (CANVAS_HEIGHT / 130 * 18) * 5.2, ((CANVAS_WIDTH / 5.6) * 3.6), (CANVAS_HEIGHT / 130 * 16), mouseX, mouseY))
            {
                //exit
                alert("exit");
            }
        } else if (shopping)
        {
            if (shoppingScene[0])
            {
                if (mouseIsInsideImage(40, 160, imageWidth, imageHeight, mouseX, mouseY))
                { //yogurt list
                    shoppingScene[0] = false;//main menu
                    shoppingScene[1] = true;//yogurt
                    shoppingScene[2] = false;//bean
                    shoppingScene[3] = false;//juice
                    shoppingScene[4] = false;//lasagna

                } else if (mouseIsInsideImage(200, 165, imageWidth, imageHeight, mouseX, mouseY))
                { //bean list
                    shoppingScene[0] = false;//main menu
                    shoppingScene[1] = false;//yogurt
                    shoppingScene[2] = true;//bean
                    shoppingScene[3] = false;//juice
                    shoppingScene[4] = false;//lasagna

                } else if (mouseIsInsideImage(70, 285, imageWidth, imageHeight, mouseX, mouseY))
                {//juice list
                    shoppingScene[0] = false;//main menu
                    shoppingScene[1] = false;//yogurt
                    shoppingScene[2] = false;//bean
                    shoppingScene[3] = true;//juice
                    shoppingScene[4] = false;//lasagna

                } else if (mouseIsInsideImage(200, 300, imageWidth, imageHeight, mouseX, mouseY))
                {//lasagna list
                    shoppingScene[0] = false;//main menu
                    shoppingScene[1] = false;//yogurt
                    shoppingScene[2] = false;//bean
                    shoppingScene[3] = false;//juice
                    shoppingScene[4] = true;//lasagna

                } else if (mouseIsInsideImage(70, 420, 200, 200, mouseX, mouseY))
                {//pay the items
                    var full = true;
                    if (kart.length == 4)
                    {
                        for (var i = 0; i < kart.length; i++)
                        {
                            if (kart[i] == null)
                            {
                                full = false;
                            }
                        }
                        if (full)
                        {
                            shopping = false;
                            result = true;
                        }
                    }
                }
            } else
            {
                if (shoppingScene[1])
                {//put the items into the kart
                    buy(yogurts, 0);
                } else if (shoppingScene[2])
                {//put the items into the kar
                    buy(beans, 1);
                } else if (shoppingScene[3])
                {//put the items into the kar
                    buy(juice, 2);
                } else if (shoppingScene[4])
                {//put the items into the kar
                    buy(lasagna, 3);
                }

                if (mouseIsInsideImage(CANVAS_WIDTH - 80, CANVAS_HEIGHT - 80, 70, 70, mouseX, mouseY))
                {//back to main menu
                    shoppingScene[0] = true;//main menu
                    shoppingScene[1] = false;//yogurt
                    shoppingScene[2] = false;//bean
                    shoppingScene[3] = false;//juice
                    shoppingScene[4] = false;//lasagna

                }
            }
        } else if (result)
        {//if its result screen
            if (mouseIsInsideImage(80, 450, CANVAS_WIDTH / 2, 70, mouseX, mouseY))
            {//review button

                mainMenu = true;
                result = false;
                kart = [];

            }

        }


    }
}

function buy(food, index)
{
    for (var i = 0; i < food.length; i++)
    {
        //if the mouse is inside the image of the food
        if (mouseIsInsideImage(food[i].getX(), food[i].getY(), food[i].getWidth(), food[i].getHeight(), mouseX, mouseY))
        {
            //add the onject food to the kart
            kart[index] = food[i];
        }
    }
}



//mouse is inside image is collision detection if the position mouse x and y is inside the image
function mouseIsInsideImage(imageTopLeftX, imageTopLeftY, imageWidth, imageHeight, x, y)
{
    if ((x > imageTopLeftX) && (y > imageTopLeftY))
    {
        if (x > imageTopLeftX)
        {
            if ((x - imageTopLeftX) > imageWidth)
            {
                return false; // to the right of the image
            }
        }

        if (y > imageTopLeftY)
        {
            if ((y - imageTopLeftY) > imageHeight)
            {
                return false; // below the image
            }
        }
    } else // above or to the left of the image
    {
        return false;
    }
    return true; // inside image
}