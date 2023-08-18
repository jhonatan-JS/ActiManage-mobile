import { Activity } from '@interface/index';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({ name: 'activities.db', location: 'default' });

export const initializeDatabase = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS activities (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT, date TEXT, time TEXT)',
        [],
        () => resolve(),
        (_, error) => reject(error),
      );
    });
  });
};

export const getAllActivities = (): Promise<Activity[]> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM activities',
        [],
        (_, resultSet) => {
          const activities: Activity[] = [];
          const rows = resultSet.rows;
          for (let i = 0; i < rows.length; i++) {
            const row = rows.item(i);
            activities.push({
              id: row.id,
              title: row.title,
              description: row.description,
              date: row.date,
              time: row.time,
            });
          }
          resolve(activities);
        },
        (_, error) => reject(error),
      );
    });
  });
};

export const addOrUpdateActivity = (activity: Activity): Promise<number> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      if (activity.id) {
        tx.executeSql(
          'UPDATE activities SET title = ?, description = ?, date = ?, time = ? WHERE id = ?',
          [
            activity.title,
            activity.description,
            activity.date,
            activity.time,
            activity.id,
          ],
          () => {
            resolve(activity.id);
          },
          (_, error) => reject(error),
        );
      } else {
        tx.executeSql(
          'INSERT INTO activities (title, description, date, time) VALUES (?, ?, ?, ?)',
          [activity.title, activity.description, activity.date, activity.time],
          (_, resultSet) => {
            resolve(resultSet.insertId);
          },
          (_, error) => reject(error),
        );
      }
    });
  });
};

export const deleteActivity = (activityId: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM activities WHERE id = ?',
        [activityId],
        () => resolve(),
        (_, error) => reject(error),
      );
    });
  });
};

export const getActivitiesBySemester = (
  year: string,
  semester: string,
): Promise<Activity[]> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      let query = 'SELECT * FROM activities WHERE substr(date, 7, 4) = ?';

      if (semester !== '') {
        query += ' AND (substr(date, 4, 2) BETWEEN ? AND ?)';
      }

      const params = [year];
      if (semester !== '') {
        params.push(semester === '1' ? '01' : '07');
        params.push(semester === '1' ? '06' : '12');
      }

      tx.executeSql(
        query,
        params,
        (_, resultSet) => {
          const activities: Activity[] = [];
          const rows = resultSet.rows;
          for (let i = 0; i < rows.length; i++) {
            const row = rows.item(i);
            activities.push({
              id: row.id,
              title: row.title,
              description: row.description,
              date: row.date,
              time: row.time,
            });
          }
          resolve(activities);
        },
        (_, error) => reject(error),
      );
    });
  });
};

export const checkIfTableExists = (): Promise<boolean> => {
  return new Promise(resolve => {
    db.transaction(tx => {
      tx.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='activities'",
        [],
        (_, resultSet) => {
          const rowCount = resultSet.rows.length;
          resolve(rowCount > 0);
        },
        (_, error) => {
          console.error('Error checking table existence:', error);
          resolve(false);
        },
      );
    });
  });
};
