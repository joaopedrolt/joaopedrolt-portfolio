import Experience from "../Experience";

export default class Controls {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.camera = this.experience.camera;

        this.circleFirst = this.experience.world.floor.circleFirst;
        console.log(this.circleFirst);

        /*
            this.setPath();
            this.onWheel(); 
        */
    }

    /* 
        setPath() {
            this.curve = new THREE.CatmullRomCurve3([
                new THREE.Vector3(-5, 0, 0),
                new THREE.Vector3(0, 0, -5),
                new THREE.Vector3(5, 0, 0),
                new THREE.Vector3(0, 0, 5),
            ], true);
    
            const points = this.curve.getPoints(50);
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
    
            const material = new THREE.LineBasicMaterial({ color: 0xff0000 });
    
            const curveObject = new THREE.Line(geometry, material);
    
            this.scene.add(curveObject);
        }
    
        onWheel() {
            window.addEventListener('wheel', (e) => {
                console.log(e);
                if (e.deltaY > 0) {
                    this.lerp.target += 0.01;
                } else {
                    this.lerp.target -= 0.01;
                }
            });
        } 
    */

    resize() {

    }

    update() {
        /*
               this.curve.getPointAt(this.lerp.current % 1, this.position);
               this.camera.orthographicCamera.position.copy(this.position);
       
               this.directionalVector.subVectors(
                   this.curve.getPointAt((this.lerp.current % 1) + 0.000001),
                   this.position
               );
               this.directionalVector.normalize();
               this.crossVector.crossVectors(
                   this.directionalVector,
                   this.staticVector
               );
               this.crossVector.multiplyScalar(100000);
               this.camera.orthographicCamera.lookAt(this.crossVector);
       
                if (this.back) {
                    this.lerp.target -= 0.001;
                } else {
                    this.lerp.target += 0.001;
                }
                this.lerp.target += 0.001;
                this.lerp.target = GSAP.utils.clamp(0, 1, this.lerp.target);
                this.lerp.current = GSAP.utils.clamp(0, 1, this.lerp.current);
                
        
                this.curve.getPointAt(this.lerp.current+0.00001, this.lookAtPosition);
        
       
                 */
    }
}