import { Test, TestingModule } from '@nestjs/testing';
import { CustomerLoginController } from './customer_login.controller';

describe('CustomerLoginController', () => {
  let controller: CustomerLoginController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerLoginController],
    }).compile();

    controller = module.get<CustomerLoginController>(CustomerLoginController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
