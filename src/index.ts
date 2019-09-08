import { MobileController } from './MobileController';
import { DesktopController } from './DesktopController';

const ws = new WebSocket('wss://acceleromate.herokuapp.com');

const main = () => {
  let appController;
  const isMobile = window.innerWidth < 960;
  
  if (isMobile && window.DeviceOrientationEvent) {
    appController = new MobileController(ws);
  } 
  
  if (!isMobile) {
    appController = new DesktopController(ws);
  }
}

document.addEventListener('DOMContentLoaded', main);