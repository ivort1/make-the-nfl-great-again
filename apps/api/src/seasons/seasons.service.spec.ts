import { Test, TestingModule } from '@nestjs/testing';
import { SeasonsService } from './seasons.service';
import { SeasonsController } from './seasons.controller';

describe('SeasonsService', () => {
  let seasonsService: SeasonsService;
  let seasonsController = SeasonsController;
  let mockDatabase: any;

  beforeEach(async () => {
    mockDatabase = {
      select: jest.fn().mockReturnThis(),
      from: jest.fn().mockReturnThis(),
      leftJoin: jest.fn().mockReturnThis(),
      where: jest.fn()
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        SeasonsService,
        {
          provide: "DATABASE",
          useValue: mockDatabase
        }
      ]
    }).compile();

    seasonsService = moduleRef.get(SeasonsService);

    describe("findAll", () => {
      it("should return all seasons", async () => {
        const mockSeasons = [
          { year: 2025, platform: "sleeper", stauts: "complete" },
          { year: 2024, platform: "sleeper", stauts: "complete" }
        ];

        mockDatabase.from.mockResolvedValue(mockSeasons);

        const result = await seasonsService.findAll();

        expect(result.data).toEqual(mockSeasons);
        expect(result.data).toHaveLength(2);
      })
    })
  })
});
