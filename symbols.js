var E = window.E || {};

(function (namespace) {

    namespace.getSVGSize = function () {
        var ary = new Array(2);
        var svgsize = 150;
        if (window.innerWidth) {
            svgsize = Math.floor(window.innerWidth / 4);
        }
        ary[0] = svgsize;
        ary[1] = Math.floor(svgsize / 2);
        return (ary);
    };

    namespace.renderStar = function(npoints, startx, starty, outterRadius, innerRadius) {
        var sizedata = namespace.getSVGSize();
        var svgsize = sizedata[0];
        var centrepoint = sizedata[1];

        var radiuso = outterRadius;
        var radiusi = innerRadius;


        var pathArray = [];
        var skew = 0;

        var result = '<pre>\n&lt;path';
        var svgdata = 'M ' + centrepoint + ' ' + centrepoint + '\n';

        //if (cssclass.length > 0) {
        //    result += ' class="' + cssclass + '"';
        //}

        result += '  d="\n';

        var baseAngle = Math.PI / npoints;
        var counter = 0;
        var oddeven = 0;
        var r = 0;
        var cmd = '';
        var x = 0;
        var y = 0;
        var yangle = 0;
        var trianglesArray = [];

        /*
           Calculate points. Skew code is buggy, so 
           skew value forced to zero.
        */
        for (var i = 0; i <= Math.PI * 2; i += baseAngle) {
            if (oddeven === 0) {
                /* Start on inner radius. */
                r = radiusi;
                oddeven = 1;
                yangle = i;
            }
            else {
                /* Even points on outer radius. */
                r = radiuso;
                oddeven = 0;
                yangle = i + (baseAngle * skew);
            }

            if (counter == 0) {
                cmd = 'M';
            }
            else {
                cmd = 'L';
            }

            var xsvg = namespace.number_format((r * Math.sin(i)) + centrepoint, 3, '.', '');
            var ysvg = namespace.number_format((r * Math.cos(yangle)) + centrepoint, 3, '.', '');

            var xresult = namespace.number_format((r * Math.sin(i)) + parseFloat(startx), 3, '.', '');
            var yresult = namespace.number_format((r * Math.cos(yangle)) + parseFloat(starty), 3, '.', '');

            result += cmd + ' ' + xresult + ' ' + yresult + '\n';
            svgdata += cmd + ' ' + xsvg + ' ' + ysvg + '\n';

            trianglesArray.push(cmd);
            trianglesArray.push(xsvg.toString());
            trianglesArray.push(ysvg.toString());

            counter++;
        }

        /*
           Even numbers of points don't auto-close,
           so do a return-to-origin.
        */
        if (npoints % 2 === 0) {
            result += 'z\n';
            svgdata += 'z\n';
        }

        result += '"/>\n';

        return trianglesArray;
    };

    namespace.number_format = function(number, decimals, dec_point, thousands_sep) {
        // Strip all characters but numerical ones.
        number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
        var n = !isFinite(+number) ? 0 : +number,
            prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
            sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
            dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
            s = '',
            toFixedFix = function(n, prec) {
                var k = Math.pow(10, prec);
                return '' + Math.round(n * k) / k;
            };
        // Fix for IE parseFloat(0.55).toFixed(0) = 0;
        s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
        if (s[0].length > 3) {
            s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
        }
        if ((s[1] || '').length < prec) {
            s[1] = s[1] || '';
            s[1] += new Array(prec - s[1].length + 1).join('0');
        }
        return s.join(dec);
    };


}(E.HighchartsCustomMarkers = E.HighchartsCustomMarkers || {}));

$.extend(Highcharts.Renderer.prototype.symbols, {
    FourPointStar: function (x, y, w, h) {        

        var outerRadius = w;
        var innerRadius = w * .5;

        var startX = (x + (x + (w * .5)));
        var startY = (y + (y + (y * .5)));

        var starResult = E.HighchartsCustomMarkers.renderStar(4, startX, startY, outerRadius, innerRadius);

        starResult.push('z');

        return starResult;        
    },
    FivePointStar: function (x, y, w, h) {
        
        var outerRadius = w;
        var innerRadius = w * .5;

        var startX = (x + (x + (w * .5)));
        var startY = (y + (y + (y * .5)));

        var starResult = E.HighchartsCustomMarkers.renderStar(5, startX, startY, outerRadius, innerRadius);

        starResult.push('z');

        return starResult;

    },
    SixPointStar: function (x, y, w, h) {
        
        var outerRadius = w;
        var innerRadius = w * .5;

        var startX = (x + (x + (w * .5)));
        var startY = (y + (y + (y * .5)));

        var starResult = E.HighchartsCustomMarkers.renderStar(6, startX, startY, outerRadius, innerRadius);

        starResult.push('z');

        return starResult;

    },
    TenPointStar: function (x, y, w, h) {
        
        var outerRadius = w;
        var innerRadius = w * .5;

        var startX = (x + (x + (w * .5)));
        var startY = (y + (y + (y * .5)));

        var starResult = E.HighchartsCustomMarkers.renderStar(10, startX, startY, outerRadius, innerRadius);

        starResult.push('z');

        return starResult;

    },
    Cross: function (x, y, w, h) {

        var crossPathArray = [];

        //start at top middle
        crossPathArray.push('M');
        crossPathArray.push(x + (w * .5));
        crossPathArray.push(y);

        //line to bottom middle
        crossPathArray.push('L');
        crossPathArray.push(x + (w * .5));
        crossPathArray.push(y + h);

        //line to center
        crossPathArray.push('L');
        crossPathArray.push(x + (w * .5));
        crossPathArray.push(y + (h * .5));

        //line to left middle
        crossPathArray.push('L');
        crossPathArray.push(x);
        crossPathArray.push(y + (h * .5));

        //line to right middle
        crossPathArray.push('L');
        crossPathArray.push(x + w);
        crossPathArray.push(y + (h * .5));
        
        //back to center to close out the path and prevent ackward fill attempts by highcharts.
        crossPathArray.push('L');
        crossPathArray.push(x + (w * .5));
        crossPathArray.push(y + (h * .5));        

        return crossPathArray;
    }
});

