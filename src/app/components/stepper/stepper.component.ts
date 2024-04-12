import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepperComponent {

    @Input() steps: any[] = [];

    active: number = 0;

    splitSteps(step: string): string[] {
        return step.split('. ').map(step => `${step}`);
    }
}
