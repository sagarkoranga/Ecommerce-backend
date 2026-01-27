import { Test, TestingModule } from '@nestjs/testing';
import { AdminController } from './auth.controller';
import { AdminService } from './auth.service';

describe('AuthController', () => {
  let controller: AdminController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminController],
      providers: [AdminService],
    }).compile();

    controller = module.get<AdminController>(AdminController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
