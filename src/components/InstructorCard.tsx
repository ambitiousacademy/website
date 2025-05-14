import { Card, CardContent } from "@/components/ui/card";
import { Instructor } from "@/data/instructors";

interface InstructorCardProps {
  instructor: Instructor;
}

const InstructorCard = ({ instructor }: InstructorCardProps) => {
  console.log(instructor);
  return (
    <Card className="flex flex-col h-full overflow-hidden card-hover">
      <div className="aspect-square w-full overflow-hidden">
        <img
          src={encodeURI(instructor.image)}
          alt={instructor.name}
          className="h-full w-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardContent className="flex flex-col flex-grow p-4 overflow-hidden">
        <h3 className="text-lg font-semibold leading-snug">
          {instructor.name}
        </h3>
        <p className="text-sm text-academy-teal mb-2 leading-tight">
          {instructor.title}
        </p>

        <div className="flex flex-wrap gap-2 mb-3 min-h-[60px]">
          {instructor.specializations.slice(0, 4).map((spec) => (
            <span
              key={spec}
              className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full whitespace-nowrap"
            >
              {spec}
            </span>
          ))}
        </div>

        <p className="text-sm text-gray-600 line-clamp-4 mt-auto">
          {instructor.bio}
        </p>
      </CardContent>
    </Card>
  );
};

export default InstructorCard;
