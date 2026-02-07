import { Test, TestingModule } from '@nestjs/testing';
import { SeasonsService } from './seasons.service';
import { NotFoundException } from '@nestjs/common';

describe('SeasonsService', () => {
  let seasonsService: SeasonsService;
  let mockDatabase: any;

  beforeEach(async () => {
    mockDatabase = {
      select: jest.fn().mockReturnThis(),
      from: jest.fn().mockReturnThis(),
      leftJoin: jest.fn().mockReturnThis(),
      where: jest.fn(),
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        SeasonsService,
        {
          provide: 'DATABASE',
          useValue: mockDatabase,
        },
      ],
    }).compile();

    seasonsService = moduleRef.get(SeasonsService);
  });

  describe('findAll', () => {
    it('should return all seasons', async () => {
      const mockSeasons = [
        { year: 2025, platform: 'sleeper', leagueId: '1190420508638478336', playoffSlots: 6, leagueFee: '100.00', status: 'complete' },
        { year: 2024, platform: 'sleeper', leagueId: '1051226271402885120', playoffSlots: 6, leagueFee: '100.00', status: 'complete' },
      ];

      mockDatabase.from.mockResolvedValue(mockSeasons);

      const result = await seasonsService.findAll();

      expect(result.data).toEqual(mockSeasons);
      expect(result.data).toHaveLength(2);
    });
  });

  describe('findOne', () => {
    it('should correctly identify champion and runner-up from query results', async () => {
      // Arrange - rows come back unordered from DB
      const mockRows = [
        { teamFinalStanding: 2, ownerId: 'runner-up-id', ownerDisplayName: 'Second Place' },
        { teamFinalStanding: 1, ownerId: 'champion-id', ownerDisplayName: 'Winner' },
      ];
      mockDatabase.where.mockResolvedValue(mockRows);

      // Act
      const result = await seasonsService.findOne(2025);

      // Assert - your logic correctly picks champion vs runner-up
      expect(result.champion?.ownerId).toBe('champion-id');
      expect(result.runnerUp?.ownerId).toBe('runner-up-id');
    });

    it('should return null champion when season has no finalStanding = 1', async () => {
      const mockRows = [
        { finalStanding: null, ownerId: 'some-id', ownerDisplayName: 'Name' },
      ];
      mockDatabase.where.mockResolvedValue(mockRows);

      const result = await seasonsService.findOne(2025);

      expect(result.champion).toBeNull();
    });

    it('should throw NotFoundException for non-existent season', async () => {
      mockDatabase.where.mockResolvedValue([]);

      await expect(seasonsService.findOne(1999)).rejects.toThrow(NotFoundException);
    });
  });
});