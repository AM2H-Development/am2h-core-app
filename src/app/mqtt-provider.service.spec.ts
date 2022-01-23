import { TestBed } from '@angular/core/testing';

import { MqttProviderService } from './mqtt-provider.service';

describe('MqttProviderService', () => {
  let service: MqttProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MqttProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
