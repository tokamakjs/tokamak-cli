import { RouterService } from '@tokamakjs/common';
import { Controller, onDidMount, onDidRender, state } from '@tokamakjs/react';

@Controller()
export class RootController {
  @state public counter = 0;

  @onDidMount()
  public doStuffOnMount() {
    console.log('RootController::Mounted');

    return () => {
      console.log('RootController::Unmounted');
    };
  }

  @onDidRender()
  public doStuffAfterRender() {
    console.log('RootController::Render');
  }

  public increase(): void {
    this.counter += 1;
  }

  public decrease(): void {
    this.counter -= 1;
  }
}