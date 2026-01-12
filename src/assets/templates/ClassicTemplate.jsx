import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const ClassicTemplate = ({ data, accentColor }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white text-gray-800 leading-relaxed">
      {/* Header */}
      <header
        className="text-center mb-8 pb-6 border-b-2"
        style={{ borderColor: accentColor }}
      >
        <h1 className="text-3xl font-bold mb-2" style={{ color: accentColor }}>
          {data.personal_info?.full_name || "Your Name"}
        </h1>

        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          {data.personal_info?.email && (
            <div className="flex items-center gap-1">
              <Mail className="size-4" />
              <span>{data.personal_info.email}</span>
            </div>
          )}
          {data.personal_info?.phone && (
            <div className="flex items-center gap-1">
              <Phone className="size-4" />
              <span>{data.personal_info.phone}</span>
            </div>
          )}
          {data.personal_info?.location && (
            <div className="flex items-center gap-1">
              <MapPin className="size-4" />
              <span>{data.personal_info.location}</span>
            </div>
          )}
          {data.personal_info?.linkedin && (
            <div className="flex items-center gap-1">
              <Linkedin className="size-4" />
              <span className="break-all">{data.personal_info.linkedin}</span>
            </div>
          )}
          {data.personal_info?.website && (
            <div className="flex items-center gap-1">
              <Globe className="size-4" />
              <span className="break-all">{data.personal_info.website}</span>
            </div>
          )}
        </div>
      </header>

      {/* Professional Summary */}
      {data.professional_summary && (
        <section className="mb-6">
          <h2
            className="text-xl font-semibold mb-3"
            style={{ color: accentColor }}
          >
            PROFESSIONAL SUMMARY
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {data.professional_summary}
          </p>
        </section>
      )}

      {/* Career Objective */}
      {data.career_objective && (
        <section className="mb-6">
          <h2
            className="text-xl font-semibold mb-3"
            style={{ color: accentColor }}
          >
            CAREER OBJECTIVE
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {data.career_objective}
          </p>
        </section>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <section className="mb-6">
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: accentColor }}
          >
            PROFESSIONAL EXPERIENCE
          </h2>

          <div className="space-y-4">
            {data.experience.map((exp, index) => (
              <div
                key={index}
                className="border-l-3 pl-4"
                style={{ borderColor: accentColor }}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {exp.position}
                    </h3>
                    <p className="text-gray-700 font-medium">{exp.company}</p>
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <p>
                      {formatDate(exp.start_date)} -{" "}
                      {exp.current ? "Present" : formatDate(exp.end_date)}
                    </p>
                  </div>
                </div>
                {exp.description && (
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {exp.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.project && data.project.length > 0 && (
        <section className="mb-6">
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: accentColor }}
          >
            PROJECTS
          </h2>

          <ul className="space-y-3 ">
            {data.project.map((proj, index) => (
              <div
                key={index}
                className="flex justify-between items-start border-l-3 border-gray-300 pl-6"
              >
                <div>
                  <li className="font-semibold text-gray-800 ">{proj.name}</li>
                  <p className="text-gray-600">{proj.description}</p>
                </div>
              </div>
            ))}
          </ul>
        </section>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <section className="mb-6">
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: accentColor }}
          >
            EDUCATION
          </h2>

          <div className="space-y-3">
            {data.education.map((edu, index) => (
              <div key={index} className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </h3>
                  <p className="text-gray-700">{edu.institution}</p>
                  {edu.gpa && (
                    <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>
                  )}
                </div>
                <div className="text-sm text-gray-600">
                  <p>
                    {edu.current
                      ? "Present"
                      : edu.end_date
                      ? formatDate(edu.end_date)
                      : formatDate(edu.start_date)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <section className="mb-6">
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: accentColor }}
          >
            CORE SKILLS
          </h2>

          <div className="flex gap-4 flex-wrap">
            {data.skills.map((skill, index) => (
              <div key={index} className="text-gray-700">
                • {skill}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Leadership & Activities */}
      {data.leadership && data.leadership.length > 0 && (
        <section className="mb-6">
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: accentColor }}
          >
            LEADERSHIP & ACTIVITIES
          </h2>

          <div className="space-y-4">
            {data.leadership.map((lead, index) => (
              <div
                key={index}
                className="border-l-3 pl-4"
                style={{ borderColor: accentColor }}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">{lead.role}</h3>
                    <p className="text-gray-700 font-medium">
                      {lead.organization}
                    </p>
                    {lead.location && (
                      <p className="text-sm text-gray-600">{lead.location}</p>
                    )}
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <p>
                      {formatDate(lead.start_date)} -{" "}
                      {lead.current ? "Present" : formatDate(lead.end_date)}
                    </p>
                  </div>
                </div>
                {lead.description && (
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {lead.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Research Experience */}
      {data.research && data.research.length > 0 && (
        <section className="mb-6">
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: accentColor }}
          >
            RESEARCH EXPERIENCE
          </h2>

          <div className="space-y-4">
            {data.research.map((research, index) => (
              <div
                key={index}
                className="border-l-3 pl-4"
                style={{ borderColor: accentColor }}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {research.title}
                    </h3>
                    <p className="text-gray-700 font-medium">
                      {research.institution}
                    </p>
                    {research.supervisor && (
                      <p className="text-sm text-gray-600">
                        Supervisor: {research.supervisor}
                      </p>
                    )}
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <p>
                      {formatDate(research.start_date)} -{" "}
                      {research.current
                        ? "Present"
                        : formatDate(research.end_date)}
                    </p>
                  </div>
                </div>
                {research.description && (
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line mb-2">
                    {research.description}
                  </div>
                )}
                {research.publication && (
                  <p className="text-sm text-gray-600 italic">
                    {research.publication}
                  </p>
                )}
                {research.url && (
                  <a
                    href={research.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    View Publication
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {data.certifications && data.certifications.length > 0 && (
        <section className="mb-6">
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: accentColor }}
          >
            CERTIFICATIONS
          </h2>

          <div className="space-y-3">
            {data.certifications.map((cert, index) => (
              <div key={index} className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">{cert.name}</h3>
                  <p className="text-gray-700">{cert.issuer}</p>
                  {cert.credential_id && (
                    <p className="text-sm text-gray-600">
                      Credential ID: {cert.credential_id}
                    </p>
                  )}
                </div>
                <div className="text-sm text-gray-600 text-right">
                  <p>{formatDate(cert.issue_date)}</p>
                  {cert.expiry_date && (
                    <p>Expires: {formatDate(cert.expiry_date)}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Awards & Honors */}
      {data.awards_and_honors && data.awards_and_honors.length > 0 && (
        <section className="mb-6">
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: accentColor }}
          >
            AWARDS & HONORS
          </h2>

          <div className="space-y-3">
            {data.awards_and_honors.map((award, index) => (
              <div key={index} className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">{award.title}</h3>
                  {award.issuer && (
                    <p className="text-gray-700">{award.issuer}</p>
                  )}
                  {award.description && (
                    <p className="text-sm text-gray-600 mt-1">
                      {award.description}
                    </p>
                  )}
                </div>
                {award.date && (
                  <div className="text-sm text-gray-600">
                    <p>{formatDate(award.date)}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Publications */}
      {data.publications && data.publications.length > 0 && (
        <section className="mb-6">
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: accentColor }}
          >
            PUBLICATIONS
          </h2>

          <div className="space-y-4">
            {data.publications.map((pub, index) => (
              <div
                key={index}
                className="border-l-3 pl-4"
                style={{ borderColor: accentColor }}
              >
                <h3 className="font-semibold text-gray-900 mb-1">
                  {pub.title}
                </h3>
                {pub.authors && (
                  <p className="text-gray-700 text-sm mb-1">{pub.authors}</p>
                )}
                <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                  {pub.journal && <span>{pub.journal}</span>}
                  {pub.year && <span>• {pub.year}</span>}
                  {pub.volume && <span>• Vol. {pub.volume}</span>}
                  {pub.pages && <span>• pp. {pub.pages}</span>}
                </div>
                {pub.doi && (
                  <p className="text-sm text-gray-600 mt-1">DOI: {pub.doi}</p>
                )}
                {pub.url && (
                  <a
                    href={pub.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    View Publication
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ClassicTemplate;
