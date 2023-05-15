vaxInitParallax( 2 );

light.position.set( 0, 0, 0 );

var coneGeometry = new THREE.ConeGeometry(1,1);
var containerGeometry = new THREE.BoxGeometry(3000,3000,3000);
var containerMaterial = new THREE.MeshLambertMaterial({ color: 0xc9c9ff, side: THREE.DoubleSide});
var coneMaterial = new THREE.MeshLambertMaterial( {color: 0x733e98} );
var containerMesh = new THREE.Mesh(containerGeometry,containerMaterial);

scene.add(containerMesh);

var conesNumber = 300;
var objects = [];
for( var i=0; i<conesNumber; i++)
{
	var coneMesh = new THREE.Mesh( coneGeometry, coneMaterial );
					
	coneMesh.scale.set( 50, 200, 50 );
				
	var wall = Math.floor(Math.random()*6);

	var x;
	var y;
	var z;


	switch (wall) {
  		case 0:
    		x = 1500;
			y = THREE.MathUtils.randFloat(-1500,1500);
			z = THREE.MathUtils.randFloat(-1500,1500);
			break;
		case 1:
    		x = -1500;
			y = THREE.MathUtils.randFloat(-1500,1500);
			z = THREE.MathUtils.randFloat(-1500,1500);
			break;
		case 2:
    		x = THREE.MathUtils.randFloat(-1500,1500);
			y = 1500;
			z = THREE.MathUtils.randFloat(-1500,1500);
			break;
		case 3:
			x = THREE.MathUtils.randFloat(-1500,1500);
			y = -1500;
			z = THREE.MathUtils.randFloat(-1500,1500);
			break;
		case 4:
    		x = THREE.MathUtils.randFloat(-1500,1500);
			y = THREE.MathUtils.randFloat(-1500,1500);
			z = 1500;
			break;
		case 5:
			x = THREE.MathUtils.randFloat(-1500,1500);
			y = THREE.MathUtils.randFloat(-1500,1500);
			z = -1500;
						break;
 		default:
    		alert("greshnastena " + wall);
	}

	coneMesh.position.set(x,y,z);
				
	objects.push( coneMesh );
	scene.add( coneMesh );
}
			
window.addEventListener( "deviceorientation", deviceOrientation, true);

var previousLetter;
var previousGamma;
var previousAlpha;
			
function deviceOrientation( event )
{
	var alpha = event.alpha;

	if( alpha === null ) alert("greshka");

	var gamma = event.gamma;

	if( gamma === null ) alert("greshka");

				
	if( gamma >= 0 ) {
		gamma = 90-gamma;
		if(!previousLetter){
			previousLetter = 'A';
			previousGamma = gamma;
			previousAlpha = alpha;
		} else {
			if(previousLetter != 'A'){
				if(Math.abs(previousGamma-gamma)<30){
					previousLetter = 'A';
					previousGamma = gamma;
					previousAlpha = alpha;
				} else {
					alpha = alpha - 180;
					gamma = previousGamma;
				}
			} else {
				previousGamma = gamma;
				previousAlpha = alpha;
			}
		}
	}
	else {
		alpha = alpha+180;
		gamma = -90-gamma;
		if(!previousLetter){
			previousLetter = 'A';
			previousGamma = gamma;
			previousAlpha = alpha;
		} else {
			if(previousLetter != 'B'){
				if(Math.abs(previousGamma-gamma)<30){
					previousLetter = 'B';
					previousGamma = gamma;
					previousAlpha = alpha;
				} else {
					alpha = alpha + 180;
					gamma = previousGamma;
				}
			} else {
				previousGamma = gamma;
				previousAlpha = alpha;
			}
		}
	}
									
	alpha = THREE.MathUtils.degToRad( alpha );
	gamma = THREE.MathUtils.degToRad( gamma );
				
	camera.rotation.set( gamma, alpha, 0, 'YXZ' );
}