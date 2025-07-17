import { Injectable } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ToastComponent } from '@components/toast/toast.component';

@Injectable({ providedIn: 'root' })
export class ToastService {
  constructor(private overlay: Overlay) {}

  show(
    message: string,
    type: 'success' | 'error' | 'info' = 'info',
    duration = 3000
  ) {
    const overlayRef: OverlayRef = this.overlay.create({
      positionStrategy: this.overlay
        .position()
        .global()
        .top('20px')
        .right('20px'),
      hasBackdrop: false,
      scrollStrategy: this.overlay.scrollStrategies.noop(),
    });

    const toastPortal = new ComponentPortal(ToastComponent);
    const toastRef = overlayRef.attach(toastPortal);

    const instance = toastRef.instance as ToastComponent;
    instance.message = message;
    instance.type = type;

    setTimeout(() => overlayRef.dispose(), duration);
  }
}
