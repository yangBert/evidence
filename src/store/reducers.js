import sliderReducer from 'pages/common/menu/store/reducer';
import headReducer from 'pages/common/header/store/reducer';
import loginReducer from 'pages/login/store/reducer';
import appReducer from 'pages/app/store/reducer';
import evidenceReducer from 'pages/evidence/store/reducer';

export default {
  login: loginReducer,
  slider: sliderReducer,
  header: headReducer,
  app: appReducer,
  evidence:evidenceReducer
};