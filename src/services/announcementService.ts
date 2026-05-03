import { Announcement, AnnouncementStatus, UserRole } from '../types';

// Mock data for targeting
export const FACULTIES = [
  { id: 'f1', name: 'Faculty of Information Technology', departments: ['d1', 'd2'] },
  { id: 'f2', name: 'Faculty of Pharmacy', departments: ['d3'] },
  { id: 'f3', name: 'Faculty of Business', departments: ['d4', 'd5'] }
];

export const DEPARTMENTS = [
  { id: 'd1', name: 'Software Engineering', facultyId: 'f1' },
  { id: 'd2', name: 'Cyber Security', facultyId: 'f1' },
  { id: 'd3', name: 'Pharmacy', facultyId: 'f2' },
  { id: 'd4', name: 'Accounting', facultyId: 'f3' },
  { id: 'd5', name: 'Marketing', facultyId: 'f3' }
];

export const ACADEMIC_YEARS = ['2020', '2021', '2022', '2023', '2024'];

export interface RecipientFilters {
  faculties?: string[];
  departments?: string[];
  academicYears?: string[];
}

export const announcementService = {
  getRecipientCount: async (filters: RecipientFilters): Promise<number> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Simulate some count logic
    const fCount = filters.faculties?.length || 1;
    const dCount = filters.departments?.length || 1;
    const yCount = filters.academicYears?.length || 1;
    
    return Math.floor(Math.random() * 500) + (fCount * dCount * yCount * 50);
  },

  createAnnouncement: async (announcement: Partial<Announcement>): Promise<Announcement> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return {
      id: Math.random().toString(36).substr(2, 9),
      title: announcement.title || '',
      body: announcement.body || '',
      status: announcement.status || AnnouncementStatus.DRAFT,
      senderRole: UserRole.PRESIDENT, // This should come from auth
      senderId: 'user-1',
      recipientCount: 1247, // Mocked
      readCount: 0,
      updatedAt: new Date().toISOString(),
      ...announcement
    } as Announcement;
  },

  getAnnouncements: async (): Promise<Announcement[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [
      {
        id: '1',
        title: 'New Semester Registration Open',
        body: '<p>Registration for the Spring 2024 semester is now open...</p>',
        status: AnnouncementStatus.PUBLISHED,
        senderRole: UserRole.PRESIDENT,
        senderId: 'user-1',
        publishedAt: '2024-01-15T08:00:00Z',
        recipientCount: 3500,
        readCount: 2800,
        updatedAt: '2024-01-15T08:00:00Z'
      },
      {
        id: '2',
        title: 'Departmental Meeting Postponed',
        body: '<p>The meeting scheduled for Tuesday has been postponed to Thursday...</p>',
        status: AnnouncementStatus.DRAFT,
        senderRole: UserRole.HOD,
        senderId: 'user-2',
        recipientCount: 45,
        readCount: 0,
        updatedAt: '2024-02-01T10:30:00Z'
      }
    ];
  },

  deleteAnnouncement: async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log('Deleted announcement', id);
  }
};
