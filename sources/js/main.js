import Controller from './modules/controller';
import Model from './modules/model';
import View from './modules/view';


let app = document.getElementById('app');

let model = new Model(),
    view = new View({$app: app}),
    controller = new Controller(view, model);


controller.init();
