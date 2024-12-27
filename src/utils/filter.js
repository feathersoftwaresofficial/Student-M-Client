export const filterStudents = ({
  students,
  search,
  mentorFilter,
  programFilter,
  typeFilter,
  startDate,
  endDate,
}) => {
  const searchWithoutSpaces = search.toLowerCase().replace(/\s+/g, ''); // Remove spaces from search term

  return students.filter((student) => {
    const studentDate = new Date(student.joiningDate);
    const isInDateRange =
      (!startDate || studentDate >= new Date(startDate)) &&
      (!endDate || studentDate <= new Date(endDate));

    const studentNameWithoutSpaces = student.studentName.toLowerCase().replace(/\s+/g, ''); // Remove spaces from student name
    const mentorFilterWithoutSpaces = mentorFilter.toLowerCase().replace(/\s+/g, ''); // Remove spaces from mentor filter
    const programFilterWithoutSpaces = programFilter.toLowerCase().replace(/\s+/g, ''); // Remove spaces from program filter
    const typeFilterWithoutSpaces = typeFilter.toLowerCase().replace(/\s+/g, ''); // Remove spaces from type filter

    return (
      studentNameWithoutSpaces.includes(searchWithoutSpaces) &&
      (mentorFilter === "" || student.mentor.some((mentor) =>
        mentor.field.toLowerCase().replace(/\s+/g, '').includes(mentorFilterWithoutSpaces)
      )) &&
      (programFilter === "" || student.program.toLowerCase().replace(/\s+/g, '') === programFilterWithoutSpaces) &&
      (typeFilter === "" || student.programType.toLowerCase().replace(/\s+/g, '') === typeFilterWithoutSpaces) &&
      isInDateRange
    );
  });
};

// Refactored filtering function for activities
export const filterActivities = (activities, startDate, endDate, mentorFilter) => {
  const mentorFilterWithoutSpaces = mentorFilter.toLowerCase().replace(/\s+/g, ''); // Remove spaces from mentor filter

  return activities.filter((activity) => {
    const matchesDate =
      (startDate === "" || new Date(activity.date) >= new Date(startDate)) &&
      (endDate === "" || new Date(activity.date) <= new Date(endDate));

    const matchesMentor =
      mentorFilter === "" || activity.mentor.toLowerCase().replace(/\s+/g, '').includes(mentorFilterWithoutSpaces);

    return matchesDate && matchesMentor;
  });
};

// Refactored filtering function for users
export const filterUsers = (allUsers, searchTerm, roleFilter, currentUserId) => {
  const searchTermWithoutSpaces = searchTerm.toLowerCase().replace(/\s+/g, ''); // Remove spaces from search term
  const roleFilterWithoutSpaces = roleFilter.toLowerCase().replace(/\s+/g, ''); // Remove spaces from role filter

  return allUsers
    .filter((user) => user.id !== currentUserId)
    .filter((user) => {
      const matchesSearchTerm =
        user.username.toLowerCase().replace(/\s+/g, '').includes(searchTermWithoutSpaces) ||
        user.email.toLowerCase().replace(/\s+/g, '').includes(searchTermWithoutSpaces);
      const matchesRoleFilter =
        roleFilterWithoutSpaces === "" || user.role.toLowerCase().replace(/\s+/g, '').includes(roleFilterWithoutSpaces);
      return matchesSearchTerm && matchesRoleFilter;
    });
};



export const getFilteredStudents = ({
  students,
  searchTerm = "",
  startDate = "",
  endDate = "",
}) => {
  const searchTermWithoutSpaces = searchTerm.toLowerCase().replace(/\s+/g, ""); // Remove spaces from search term

  return students.filter((student) => {
    const matchesDate =
      (startDate === "" || student.joiningDate >= startDate) &&
      (endDate === "" || student.joiningDate <= endDate);

    const matchesSearch =
      searchTermWithoutSpaces === "" ||
      student.studentName
        .toLowerCase()
        .replace(/\s+/g, "")
        .includes(searchTermWithoutSpaces) ||
      student.email
        .toLowerCase()
        .replace(/\s+/g, "")
        .includes(searchTermWithoutSpaces);

    return matchesDate && matchesSearch;
  });
};

