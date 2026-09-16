import mongoose from 'mongoose';
import Activity from '../models/activity';
import Leaderboard from '../models/leaderboard';
import Team from '../models/team';
import User from '../models/user';
import Workout from '../models/workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
      User.deleteMany({}),
      Team.deleteMany({}),
    ]);

    const teams = await Team.insertMany([
      {
        name: 'Summit Striders',
        city: 'Denver',
        focus: 'Endurance training',
        captainName: 'Maya Chen',
        memberCount: 8,
      },
      {
        name: 'Pulse Pack',
        city: 'Austin',
        focus: 'HIIT and strength circuits',
        captainName: 'Jordan Alvarez',
        memberCount: 6,
      },
      {
        name: 'Harbor Hustle',
        city: 'Seattle',
        focus: 'Mobility and functional fitness',
        captainName: 'Nina Patel',
        memberCount: 7,
      },
    ]);

    const [summitStriders, pulsePack, harborHustle] = teams;

    const users = await User.insertMany([
      {
        name: 'Maya Chen',
        email: 'maya.chen@octofit.test',
        age: 31,
        fitnessLevel: 'advanced',
        weeklyGoal: 5,
        favoriteActivity: 'Trail Running',
        teamId: summitStriders._id,
      },
      {
        name: 'Jordan Alvarez',
        email: 'jordan.alvarez@octofit.test',
        age: 28,
        fitnessLevel: 'intermediate',
        weeklyGoal: 4,
        favoriteActivity: 'Rowing',
        teamId: pulsePack._id,
      },
      {
        name: 'Nina Patel',
        email: 'nina.patel@octofit.test',
        age: 35,
        fitnessLevel: 'advanced',
        weeklyGoal: 5,
        favoriteActivity: 'Mobility Flow',
        teamId: harborHustle._id,
      },
      {
        name: 'Evan Brooks',
        email: 'evan.brooks@octofit.test',
        age: 24,
        fitnessLevel: 'beginner',
        weeklyGoal: 3,
        favoriteActivity: 'Cycling',
        teamId: summitStriders._id,
      },
      {
        name: 'Sofia Martinez',
        email: 'sofia.martinez@octofit.test',
        age: 30,
        fitnessLevel: 'intermediate',
        weeklyGoal: 4,
        favoriteActivity: 'Strength Training',
        teamId: pulsePack._id,
      },
    ]);

    const [mayaChen, jordanAlvarez, ninaPatel, evanBrooks, sofiaMartinez] = users;
    const now = Date.now();

    await Activity.insertMany([
      {
        userId: mayaChen._id,
        type: 'Trail Run',
        durationMinutes: 52,
        caloriesBurned: 610,
        intensity: 'high',
        completedAt: new Date(now - 1000 * 60 * 60 * 26),
      },
      {
        userId: jordanAlvarez._id,
        type: 'Rowing Intervals',
        durationMinutes: 40,
        caloriesBurned: 470,
        intensity: 'moderate',
        completedAt: new Date(now - 1000 * 60 * 60 * 20),
      },
      {
        userId: ninaPatel._id,
        type: 'Mobility Circuit',
        durationMinutes: 35,
        caloriesBurned: 250,
        intensity: 'low',
        completedAt: new Date(now - 1000 * 60 * 60 * 14),
      },
      {
        userId: evanBrooks._id,
        type: 'Stationary Bike Ride',
        durationMinutes: 45,
        caloriesBurned: 390,
        intensity: 'moderate',
        completedAt: new Date(now - 1000 * 60 * 60 * 10),
      },
      {
        userId: sofiaMartinez._id,
        type: 'Strength Session',
        durationMinutes: 55,
        caloriesBurned: 520,
        intensity: 'high',
        completedAt: new Date(now - 1000 * 60 * 60 * 6),
      },
    ]);

    await Leaderboard.insertMany([
      {
        userId: mayaChen._id,
        teamId: summitStriders._id,
        score: 1840,
        rank: 1,
        streakDays: 18,
        totalWorkouts: 42,
      },
      {
        userId: sofiaMartinez._id,
        teamId: pulsePack._id,
        score: 1710,
        rank: 2,
        streakDays: 14,
        totalWorkouts: 38,
      },
      {
        userId: jordanAlvarez._id,
        teamId: pulsePack._id,
        score: 1635,
        rank: 3,
        streakDays: 11,
        totalWorkouts: 34,
      },
      {
        userId: ninaPatel._id,
        teamId: harborHustle._id,
        score: 1585,
        rank: 4,
        streakDays: 10,
        totalWorkouts: 31,
      },
      {
        userId: evanBrooks._id,
        teamId: summitStriders._id,
        score: 1240,
        rank: 5,
        streakDays: 6,
        totalWorkouts: 22,
      },
    ]);

    await Workout.insertMany([
      {
        userId: mayaChen._id,
        title: 'Altitude Tempo Run',
        category: 'Cardio',
        scheduledFor: new Date(now + 1000 * 60 * 60 * 18),
        durationMinutes: 50,
        targetArea: 'Lower body endurance',
        coachTip: 'Hold a steady threshold pace through the middle third.',
      },
      {
        userId: jordanAlvarez._id,
        title: 'Power Row Pyramid',
        category: 'HIIT',
        scheduledFor: new Date(now + 1000 * 60 * 60 * 22),
        durationMinutes: 42,
        targetArea: 'Back and core',
        coachTip: 'Drive with the legs first and keep stroke rate controlled.',
      },
      {
        userId: ninaPatel._id,
        title: 'Joint Reset Flow',
        category: 'Mobility',
        scheduledFor: new Date(now + 1000 * 60 * 60 * 26),
        durationMinutes: 30,
        targetArea: 'Hips and shoulders',
        coachTip: 'Move slowly enough to own each end range without rushing.',
      },
      {
        userId: evanBrooks._id,
        title: 'Beginner Climb Ride',
        category: 'Cycling',
        scheduledFor: new Date(now + 1000 * 60 * 60 * 30),
        durationMinutes: 35,
        targetArea: 'Cardio base',
        coachTip: 'Stay seated on climbs and focus on smooth cadence changes.',
      },
      {
        userId: sofiaMartinez._id,
        title: 'Upper Body Strength Ladder',
        category: 'Strength',
        scheduledFor: new Date(now + 1000 * 60 * 60 * 34),
        durationMinutes: 48,
        targetArea: 'Chest, shoulders, and triceps',
        coachTip: 'Leave one solid rep in reserve on each pressing set.',
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
