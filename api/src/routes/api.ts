import { Router, Request, Response } from 'express';
import Candidate from '../models/Candidate';
import { IProjectQuery, ISearchResult, IProject } from '../types';

const router = Router();

// GET /api/profile - Get full profile
router.get('/profile', async (_req: Request, res: Response): Promise<void> => {
  try {
    const profile = await Candidate.findOne();

    if (!profile) {
      res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: profile
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: errorMessage
    });
  }
});

// POST /api/profile - Create or update profile
router.post('/profile', async (req: Request, res: Response): Promise<void> => {
  try {
    const existingProfile = await Candidate.findOne();

    if (existingProfile) {
      // Update existing profile
      Object.assign(existingProfile, req.body);
      const updatedProfile = await existingProfile.save();

      res.status(200).json({
        success: true,
        data: updatedProfile,
        message: 'Profile updated successfully'
      });
      return;
    }

    // Create new profile
    const newProfile = new Candidate(req.body);
    const savedProfile = await newProfile.save();

    res.status(201).json({
      success: true,
      data: savedProfile,
      message: 'Profile created successfully'
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    res.status(400).json({
      success: false,
      message: 'Validation error',
      error: errorMessage
    });
  }
});

// GET /api/projects - Get projects with optional filtering
router.get('/projects', async (req: Request, res: Response): Promise<void> => {
  try {
    const { skill, keyword } = req.query as IProjectQuery;

    const profile = await Candidate.findOne();

    if (!profile) {
      res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
      return;
    }

    let projects: IProject[] = profile.projects;

    // Filter by skill if provided
    if (skill) {
      const skillFilter = skill.toLowerCase();
      projects = projects.filter((project: IProject) =>
        project.stack.some((tech: string) => tech.toLowerCase().includes(skillFilter))
      );
    }

    // Filter by keyword if provided
    if (keyword) {
      const keywordFilter = keyword.toLowerCase();
      projects = projects.filter((project: IProject) =>
        project.title.toLowerCase().includes(keywordFilter) ||
        project.description.toLowerCase().includes(keywordFilter)
      );
    }

    res.status(200).json({
      success: true,
      data: projects,
      count: projects.length
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: errorMessage
    });
  }
});

// GET /api/search - Simple text search
router.get('/search', async (req: Request, res: Response): Promise<void> => {
  try {
    const q = req.query.q as string;

    if (!q) {
      res.status(400).json({
        success: false,
        message: 'Search query parameter "q" is required'
      });
      return;
    }

    const profile = await Candidate.findOne({
      $text: { $search: q }
    });

    if (!profile) {
      res.status(200).json({
        success: true,
        message: 'No results found',
        data: {
          matchedSkills: [],
          matchedProjects: []
        }
      });
      return;
    }

    // Filter projects that match the search term
    const matchedProjects = profile.projects.filter((project: IProject) =>
      project.title.toLowerCase().includes(q.toLowerCase()) ||
      project.description.toLowerCase().includes(q.toLowerCase()) ||
      project.stack.some((tech: string) => tech.toLowerCase().includes(q.toLowerCase()))
    );

    const matchedSkills = profile.skills.filter((skill: string) =>
      skill.toLowerCase().includes(q.toLowerCase())
    );

    const searchResult: ISearchResult = {
      name: profile.name,
      email: profile.email,
      matchedSkills,
      matchedProjects,
    };

    res.status(200).json({
      success: true,
      data: searchResult
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: errorMessage
    });
  }
});

export default router;
