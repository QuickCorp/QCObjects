/**
 * QCObjects SDK 1.0
 * ________________
 *
 * Author: Jean Machuca <correojean@gmail.com>
 *
 * Cross Browser Javascript Framework for MVC Patterns
 * QuickCorp/QCObjects is licensed under the
 * GNU Lesser General Public License v3.0
 * [LICENSE] (https://github.com/QuickCorp/QCObjects/blob/master/LICENSE.txt)
 *
 * Permissions of this copyleft license are conditioned on making available
 * complete source code of licensed works and modifications under the same
 * license or the GNU GPLv3. Copyright and license notices must be preserved.
 * Contributors provide an express grant of patent rights. However, a larger
 * work using the licensed work through interfaces provided by the licensed
 * work may be distributed under different terms and without source code for
 * the larger work.
 *
 * Copyright (C) 2015 Jean Machuca,<correojean@gmail.com>
 *
 * Everyone is permitted to copy and distribute verbatim copies of this
 * license document, but changing it is not allowed.
*/
"use strict";
(function() {
  Package('org.quickcorp.tools.canvas',[
    Class('CanvasTool',{
      drawImageFilled: function (img,canvas,zoom=1,px=0,py=0){
        // get the scale
        var scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        scale = scale*zoom;
        // get the top left position of the image
        var x = (canvas.width / 2) - (img.width / 2) * scale;
        var y = (canvas.height / 2) - (img.height / 2) * scale;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, (px+x), (py+y), img.width * scale, img.height * scale);
      },
      getImageResized: function (img,width,height,resizedImage,zoom=1,px=0,py=0){
        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        canvas.style.width = width;
        canvas.style.height = height;
        this.drawImageFilled(img,canvas,zoom,px,py);
        resizedImage.src = canvas.toDataURL("image/png");
        return canvas;
      }
    })
  ]);

}).call(null);
