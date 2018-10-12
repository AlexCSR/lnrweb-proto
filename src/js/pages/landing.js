window.globals = {};
values = {
    friction: 0.8,
    timeStep: 0.01,
    amount: 15,
    mass: 2,
    count: 0
};
values.invMass = 1 / values.mass;
path = null
springs = null;
rastWhite = [];
rastBlack = [];
size = view.size * [1.5, 1.5];
blackBox = null;
equilibrium = 0;
isFilling = false;
isFillingWork = false;
isEmptying = false;
toResize = false;
pullingDown = false;
pullingUp = false;
covering = false;
pullStep = 0;
aboutUp = false;
workUp = false;
prevY = 0;
group1 = 0;
buttonGroup = 0;
fadingIn = false;
fadingOut = false;
onPhone = false;
document.onload = onLoad;

var retina = (window.retina || window.devicePixelRatio > 1);

var text = new PointText({
    point: [50, 50],
    content: 'The contents of the point text',
    fillColor: 'black',
    fontFamily: 'Courier New',
    fontWeight: 'bold',
    fontSize: 25
});

var Spring = function(a, b, strength, restLength) {
    this.a = a;
    this.b = b;
    this.restLength = restLength || 80;
    this.strength = strength ? strength : 0.55;
    this.mamb = values.invMass * values.invMass;
};
Spring.prototype.update = function() {
    var delta = this.b - this.a;
    var dist = delta.length;
    var normDistStrength = (dist - this.restLength) /
        (dist * this.mamb) * this.strength;
    delta.y *= normDistStrength * values.invMass * 0.2;
    if (!this.a.fixed)
        this.a.y += delta.y;
    if (!this.b.fixed)
        this.b.y -= delta.y;
};

function arrayHasOwnIndex(array, prop) {
    return array.hasOwnProperty(prop) && /^0$|^[1-9]\d*$/.test(prop) && prop <= 4294967294;
}

function createPath(strength) {
    var path = new Path({
        fillColor: 'black'
    });
    springs = [];
    for (var i = 0; i <= values.amount; i++) {
        segmentX = i / values.amount * size.width * 2 - size.width / 2;
        if (size.width < 1000) {
            segmentX = i / values.amount * 2000 - 1000 + size.width / 2;
        }
        var segment = path.add(new Point(segmentX, .25 * size.height));
        var point = segment.point;
        if (i == 0 || i == values.amount)
            point.y += size.height;
        point.px = point.x;
        point.py = point.y;
        point.fixed = i < 2 || i > values.amount - 2;
        if (i > 0) {
            var spring = new Spring(segment.previous.point, point, strength);
            springs.push(spring);
        }
    }
    path.position.x -= size.width / 4;
    equilibrium = path.segments[1].point.y;
    return path;
}

function onResize() {
    height = view.bounds.size._height;
    // if(retina) height/=2;
    project.clear();
    view.viewSize = [$(window).width(), height];
    onPhone = (view.bounds.size._width <= 569) || (view.bounds.size._height <= 569) ;
    
    onIPad = view.bounds.size._width <= 768 && !onPhone;
    size = view.bounds.size * [2, 2];
    if (blackBox) blackBox.remove();
    blackBox = new Shape.Rectangle(new Point(-10, 0), size);
    blackBox.fillColor = 'black';
    if (path) path.remove();
    path = createPath(.1);
    if (!isFilling && !isFillingWork) {
        drawText(false);
    } else {
        toResize = true;
        drawText(true);
    }
}

function onLoad() {
    onResize();
}

function drawText(onlyUI, onlyBlack, onlyWhite) {

    logoScale = 0.3;
    
    if (!onlyUI) {
        pos = [window.innerWidth / 2 - 1268 / 2 + 30, 48 + 12.5];
        posSlogan = [window.innerWidth / 2 - 1268 / 2 + 269, 62];
        posError = [window.innerWidth / 2, Math.round(window.innerHeight * 0.78)];

        if (window.innerWidth > 767 && window.innerWidth <= 1439) {
            pos = [window.innerWidth * 0.091146 + 30, 48 + 12.5];
        }
        if (window.innerWidth <= 767) {
            pos = [window.innerWidth * 0.056 + 30, 38 + 12.5];
        }

        if (window.innerWidth > 767 && window.innerWidth <= 1439) {
            posSlogan = [window.innerWidth / 2 + 163 - window.innerWidth * 0.817707 / 2 + 92, 62];
        }
        if (window.innerWidth > 500 && window.innerWidth <= 767) {
            posSlogan = [window.innerWidth / 2 + 163 - window.innerWidth * 0.817707 / 2 + 59, 52];
        }
        if (window.innerWidth <= 500) {
            posSlogan = [window.innerWidth / 2 + 163 - window.innerWidth * 0.888 / 2, 116];
        }

        // pos = onPhone ? [55, 38] : [80, 48];
        addRaster('logo', pos, logoScale, onlyBlack, onlyWhite);
        addRaster('slogan', posSlogan, 1, onlyBlack, onlyWhite);
        if (window.innerWidth > 767) {
            addRaster('errorLarge', posError, 1, onlyBlack, onlyWhite);
        } else if (window.innerWidth > 500 && window.innerWidth <= 767) {
            addRaster('errorMiddle', posError, 1, onlyBlack, onlyWhite);
        } else {
            addRaster('errorSmall', posError, 1, onlyBlack, onlyWhite);
        }
 
        var sc = Math.min(view.bounds.size.height / 1500, view.bounds.size.width / 1700);
        // if(retina) sc/=2;
        // pos = new Point(view.center.x - 560, view.center.y-480);
        // pos = new Point(0,0);
        pos = view.center + new Point(-10,20);
        if(onPhone) {
            pos = view.center + new Point(0,5);
        }


        addRaster('strategyAesthetics', pos, sc, onlyBlack, onlyWhite);
    }
    if (!onlyUI && !onlyBlack) {
        var errorRaster;

        if (window.innerWidth > 767) {
            errorRaster = rastWhite['errorLarge'];
        } else if (window.innerWidth > 500 && window.innerWidth <= 767) {
            errorRaster = rastWhite['errorMiddle'];
        } else {
            errorRaster = rastWhite['errorSmall'];
        }


        if (!onPhone) {
            group1 = new Group(
                path,
                blackBox,
                rastWhite['logo'],
                rastWhite['strategyAesthetics'],
                rastWhite['slogan'],
                errorRaster
            );
        } else {
            group1 = new Group(
                path,
                blackBox,
                rastWhite['logo'],
                rastWhite['strategyAesthetics'],
                rastWhite['slogan'],
                errorRaster
            );
        }
    } else {
        if (!onPhone) {
            group1 = new Group(path, blackBox);
        } else {
            group1 = new Group(path, blackBox);
        }
    }
    group1.clipped = true;
}

function addRaster(name, pos, sc, onlyBlack, onlyWhite) {
    rastWhite[name] = new Raster(name + 'Wht');
    rastWhite[name].position = pos;
    rastWhite[name].scale(sc);
    if (onlyBlack) rastWhite[name].opacity = 0;
    rastBlack[name] = new Raster(name + 'Blk');
    rastBlack[name].position = pos;
    rastBlack[name].scale(sc);
    rastBlack[name].fillColor = "#FF0000";
    rastWhite[name].counter = rastBlack[name];
    if (onlyWhite) rastBlack[name].opacity = 0;
}

function iconHover(name) {
    if (typeof rastWhite[name] != 'undefined') {
        rastWhite[name].opacity = 0;
        if (rastWhite[name].counter) rastWhite[name].counter.opacity = 0;
    }
}

var canvasLayer = document.getElementById("canvas");

function iconLeave(name) {
    if (typeof rastWhite[name] != 'undefined') {
        if ((aboutUp || workUp) && (name == 'i' || name == 'work') && !goingBack) return;
        rastWhite[name].opacity = 1;
        if (rastWhite[name].counter) rastWhite[name].counter.opacity = 1;
    }
}
oMM = function(event) {
    if (!pullingDown && !pullingUp && !isFilling && !isFillingWork) {
        followPoint(event.point, true);
    }
}
tool.onMouseMove = oMM;

function followPoint(p, restraint) {
    var location = path.getNearestLocation(p);
    var segment = location.segment;
    var point = segment.point;
    if (!point.fixed && ((restraint && location.distance < size.height / 4) || !restraint)) {
        var y = p.y;
        point.y += (y - point.y) / 6;
        if (segment.previous && !segment.previous.fixed) {
            var previous = segment.previous.point;
            previous.y += (y - previous.y) / 24;
        }
        if (segment.next && !segment.next.fixed) {
            var next = segment.next.point;
            next.y += (y - next.y) / 24;
        }
    }
}

function onFrame(event) {
    if (pullingDown) {
        pullMagnitude = pullStep * 10;
        followPoint(new Point(view.center.x, view.center.y + pullMagnitude), false);
        pullStep++;
        if (pullMagnitude > view.center.y * 1.5) {
            pullStep = 0;
            pullingDown = false;
            if (isFillingWork) {} else if (covering) {
                isFilling = true;
                removeWhiteText(false);
            } else {
                drawText(false);
            }
        }
    } else if (pullingUp) {
        pullMagnitude = pullStep * 10;
        followPoint(new Point(view.center.x, view.center.y - pullMagnitude), false);
        pullStep++;
        if (pullMagnitude > view.center.y * 1.5) {
            pullStep = 0;
            pullingUp = false;
            if (isFilling) {} else if (covering) {
                isFillingWork = true;
                removeBlackText(false);
            } else {
                drawText(false);
            }
        }
    }
    updateWave(path);
    if (fadingIn) {
        rastBlack[fadingIn].opacity += .08;
        rastWhite[fadingIn].opacity += .08;
        if (rastBlack[fadingIn].opacity >= 1) {
            rastBlack[fadingIn].opacity = 1;
            rastWhite[fadingIn].opacity = 1;
            fadingIn = false;
        }
    }
    if (fadingOut) {
        rastBlack[fadingOut].opacity -= .08;
        rastWhite[fadingOut].opacity -= .08;
        if (rastBlack[fadingOut].opacity <= 0) {
            rastBlack[fadingOut].opacity = 0;
            rastWhite[fadingOut].opacity = 0;
            fadingOut = false;
        }
    }
}

function updateWave(path) {
    var force = 1 - values.friction * values.timeStep * values.timeStep;
    var allUp = true;
    var $header = $('.header');

    if ($header.length) {
        if (path.segments[8]._point._y > $('.header__menu').offset().top) {
            $header.removeClass('-white');
        } else {
            $header.addClass('-white');
        }
    }

    for (var i = 0, l = path.segments.length; i < l; i++) {
        var point = path.segments[i].point;
        var dy = (point.y - point.py) * force;
        if (isFilling) {
            if (i != 0 && i != path.segments.length - 1) {
                dy -= 1;
                if (point.y != -50) {
                    allUp = false;
                } else if (i == path.segments.length - 2 && !aboutUp && allUp) {
                    aboutUp = true;
                    $("#about").animate({
                        'opacity': 1
                    }, 500, function() {
                        $("#aboutHeader").css('background', '');
                        rastWhite['work'].opacity = 0;
                        rastWhite['i'].opacity = 0;
                        $(".popup").removeClass('white');
                        document.title = 'L+R - About';
                        setupAbout();
                    });
                    $(".info").addClass('staticWht');
                    $(".work").addClass('staticWht');
                    $("#about").css('top', 0);
                    $("body").css('background', "#000");
                    tool.onMouseMove = false;
                }
            }
            point.py = point.y;
            point.y = Math.max(point.y + dy, -50);
        } else if (isFillingWork) {
            if (i != 0 && i != path.segments.length - 1) {
                dy += 1;
                if (i == 1 && point.y == size.height * 1.3 && !workUp) {
                    workUp = true;
                    rastBlack['work'].opacity = 0;
                    rastBlack['i'].opacity = 0;
                    $(".info").addClass('staticBlk');
                    $(".work").addClass('staticBlk');
                    $(".icon2").not('.placeholder').css('opacity', 1);
                    $("#work").css('top', 0);
                    $("#work").css('left', '');
                    $(".row_half, .row").each(function() {
                        $(this).css('height', '');
                        $(this).css('height', $(this).height());
                    });
                    $("#work").animate({
                        'opacity': 1
                    }, 500, function() {
                        $("#workHeader").css('background', '');
                        $(".popup").addClass('white');
                        document.title = 'L+R - Work';
                    });
                    setupWork();
                    tool.onMouseMove = false;
                }
            }
            point.py = point.y;
            point.y = Math.min(point.y + dy, size.height * 1.3);
        } else {
            if (i == 1 || i == path.segments.length - 2) {
                if (point.y < equilibrium - 100) {
                    dy += 1;
                } else if (point.y > equilibrium + 100) {
                    dy -= 1;
                } else {
                    dy = 0;
                    point.y = equilibrium;
                }
            }
            point.py = point.y;
            point.y = Math.min(Math.max(point.y + dy, -50), size.height * 1.3);
        }
    }
    for (var j = 0, l = springs.length; j < l; j++) {
        springs[j].update();
    }
    path.smooth();
}

function activateMouseMove() {
    tool.onMouseMove = oMM;
}
globals.onLoad = onLoad;
globals.drawText = drawText;
globals.activateMouseMove = activateMouseMove;
globals.iconHover = iconHover;
globals.iconLeave = iconLeave;
globals.resize = onResize;