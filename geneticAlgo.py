from flask import Flask, jsonify
from config import MONGO_URL, PORT
from pymongo import MongoClient
import random

app = Flask(__name__)

@app.route('/get_data', methods=['GET'])

def get_data():

    POPULATION_SIZE = 50
    NUMB_OF_ELITE_SCHEDULES = 2
    TOURNAMENT_SELECTION_SIZE = 10
    MUTATION_RATE = 0.05
    client = MongoClient(MONGO_URL)
    db = client['test']

    class Data:
        def __init__(self):
            self._rooms = list(db['rooms'].find())
            self._courses = list(db['courses'].find())
            self._depts = list(db['departments'].find())
            self._instructors = list(db['instructors'].find())
            self._sections = list(db['sections'].find())
            self._meetingTimes= list(db['meetings'].find())
            
        def get_sections(self):
            return self._sections

        def get_rooms(self):
            return self._rooms

        def get_instructors(self):
            return self._instructors

        def get_courses(self):
            return self._courses

        def get_depts(self):
            return self._depts

        def get_meetingTimes(self):
            return self._meetingTimes

    class Schedule:
        def __init__(self):
            self._classes = []
            self._numberOfConflicts = 0
            self._fitness = -1
            self._classNumb = 0
            self._isFitnessChanged = True

        def get_classes(self):
            self._isFitnessChanged = True
            return self._classes

        def get_numbOfConflicts(self):
            return self._numberOfConflicts

        def get_fitness(self):
            if self._isFitnessChanged:
                self._fitness = self.calculate_fitness()
                self._isFitnessChanged = False
            return self._fitness

        def initialize(self):
            sections = data.get_sections()
            rooms = data.get_rooms()
            available_rooms = rooms.copy()
            # Get all departments at once
            dept_ids = [section['departmentName'] for section in sections]
            depts = {str(dept['_id']): dept for dept in db['departments'].find({"_id": {"$in": dept_ids}})}

            # Get all courses at once
            course_ids = [course for dept in depts.values() for course in dept['courses']]
            courses = {str(course['_id']): course for course in db['courses'].find({"_id": {"$in": course_ids}})}

            # Get all instructors at once
            instructor_ids = [course['instructor'] for course in courses.values()]
            instructors = {str(instructor['_id']): instructor for instructor in db['instructors'].find({"_id": {"$in": instructor_ids}})}

            for section in sections:
                dept = depts[str(section['departmentName'])]
                dept_courses = [courses[str(course_id)] for course_id in dept['courses']]
                room = available_rooms.pop(0)  # Get the first room
                for course in dept_courses:
                    instructor = instructors[str(course['instructor'])]
                    for i in range(course['credit']):
                        new_class = Class(self._classNumb, dept, section['sectionId'], course)
                        self._classNumb += 1
                        new_class.set_meetingTime(random.choice(data.get_meetingTimes()))
                        new_class.set_room(room)
                        new_class.set_instructor(instructor)
                        self._classes.append(new_class)
            return self

        def calculate_fitness(self):
            self._numberOfConflicts = 0
            classes = self.get_classes()
            for i in range(len(classes)):
                if classes[i].room['capacity'] < int(classes[i].course['coursecapacity']):
                    self._numberOfConflicts += 1
                for j in range(len(classes)):
                    if j > i:
                        if (classes[i].meeting_time == classes[j].meeting_time) and \
                                    (classes[i].section == classes[j].section):
                            self._numberOfConflicts += 1

                        if (classes[i].meeting_time['day'] == classes[j].meeting_time['day']) and \
                                    (classes[i].section == classes[j].section) and (classes[i].course == classes[j].course) :
                            self._numberOfConflicts += 1
                        
                        if (classes[i].meeting_time == classes[j].meeting_time) and \
                                ( classes[i].instructor == classes[j].instructor):
                                self._numberOfConflicts += 1

            return 1 / (1.0 * self._numberOfConflicts + 1)

    class Class:
        def __init__(self, id, dept, section, course):
            self.section_id = id
            self.department = dept
            self.course = course
            self.instructor = None
            self.meeting_time = None
            self.room = None
            self.section = section

        def get_id(self): return self.section_id

        def get_dept(self): return self.department

        def get_course(self): return self.course

        def get_instructor(self): return self.instructor

        def get_meetingTime(self): return self.meeting_time

        def get_room(self): return self.room

        def set_instructor(self, instructor): self.instructor = instructor

        def set_meetingTime(self, meetingTime): self.meeting_time = meetingTime

        def set_room(self, room): self.room = room

    class Population:
        def __init__(self, size):
            self._size = size
            self._schedules = [Schedule().initialize() for i in range(size)]

        def get_schedules(self):
            return self._schedules

    class GeneticAlgorithm:
        def evolve(self, population):
            return self._mutate_population(self._crossover_population(population))

        def _crossover_population(self, pop):
            crossover_pop = Population(0)
            for i in range(NUMB_OF_ELITE_SCHEDULES):
                crossover_pop.get_schedules().append(pop.get_schedules()[i])
            i = NUMB_OF_ELITE_SCHEDULES
            while i < POPULATION_SIZE:
                schedule1 = self._select_tournament_population(pop).get_schedules()[0]
                schedule2 = self._select_tournament_population(pop).get_schedules()[0]
                crossover_pop.get_schedules().append(self._crossover_schedule(schedule1, schedule2))
                i += 1
            return crossover_pop

        def _mutate_population(self, population):
            for i in range(NUMB_OF_ELITE_SCHEDULES, POPULATION_SIZE):
                self._mutate_schedule(population.get_schedules()[i])
            return population

        def _crossover_schedule(self, schedule1, schedule2):
            crossoverSchedule = Schedule().initialize()
            for i in range(0, len(crossoverSchedule.get_classes())):
                if random.random() > 0.5:
                    crossoverSchedule.get_classes()[i] = schedule1.get_classes()[i]
                else:
                    crossoverSchedule.get_classes()[i] = schedule2.get_classes()[i]
            return crossoverSchedule

        def _mutate_schedule(self, mutateSchedule):
            schedule = Schedule().initialize()
            for i in range(len(mutateSchedule.get_classes())):
                if MUTATION_RATE > random.random():
                    mutateSchedule.get_classes()[i] = schedule.get_classes()[i]
            return mutateSchedule

        def _select_tournament_population(self, pop):
            tournament_pop = Population(0)
            i = 0
            while i < TOURNAMENT_SELECTION_SIZE:
                tournament_pop.get_schedules().append(pop.get_schedules()[random.randrange(0, POPULATION_SIZE)])
                i += 1
            tournament_pop.get_schedules().sort(key=lambda x: x.get_fitness(), reverse=True)
            return tournament_pop

    def timetable():
        schedule = []
        population = Population(POPULATION_SIZE)
        generation_num = 0
        population.get_schedules().sort(key=lambda x: x.get_fitness(), reverse=True)
        genetic_algorithm = GeneticAlgorithm()
        while population.get_schedules()[0].get_fitness() != 1.0 :
            generation_num += 1
            print('\n> Generation #' + str(generation_num))
            population = genetic_algorithm.evolve(population)
            population.get_schedules().sort(key=lambda x: x.get_fitness(), reverse=True)
            print(population.get_schedules()[0].get_fitness())
            schedule = population.get_schedules()[0].get_classes()
        return schedule

    data = Data()

    schedule = timetable()

    sections = {}
    def to_dict(cls):
        return ({
            "Department": cls.department['departmentName'],
            "Course": cls.course['courseId'],
            "Instructor": cls.instructor['name'],
            "Day": cls.meeting_time['day'],
            "StartTime": cls.meeting_time['startTime'],
            "EndTime": cls.meeting_time['endTime'],
            "Room": cls.room['roomId'],
            "Section": cls.section
        })

    for cls in schedule:
        section_name = cls.section
        if section_name not in sections:
            sections[section_name] = []
        sections[section_name].append(to_dict(cls))

    time_order = {
    "09:00": 1,
    "09:30": 2,
    "10:00": 3,
    "10:30": 4,
    "11:00": 5,
    "11:30": 6,
    "12:00": 7,
    "12:30": 8,
    "01:00": 9,
    "01:30": 10,
    "02:00": 11,
    "02:30": 12,
    "03:00": 13,
    "03:30": 14,
    "04:00": 15,
    "04:30": 16,
    "05:00": 17
    }
    sorted_sections = {}

    for section_name, classes in sections.items():
        sorted_classes = sorted(classes, key=lambda x: ( time_order[x['StartTime']]))
        for cls in sorted_classes:
            day = cls['Day']
            if section_name not in sorted_sections:
                sorted_sections[section_name] = {}
            if day not in sorted_sections[section_name]:
                sorted_sections[section_name][day] = []
            sorted_sections[section_name][day].append(cls)

    return jsonify(sorted_sections)

if __name__ == '__main__':
    app.run(debug=True, port=PORT)  # Run the server on port 5001
