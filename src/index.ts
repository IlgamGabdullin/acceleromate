import { MobileController } from './MobileController';
import { DesktopController } from './DesktopController';

const main = () => {
  let appController;
  // TODO: get better device recognizing
  const isMobile = window.innerWidth < 960;
  
  if (isMobile && window.DeviceOrientationEvent) {
    appController = new MobileController();
  } 
  
  if (!isMobile) {
    appController = new DesktopController();
  }
}

document.addEventListener('DOMContentLoaded', main);