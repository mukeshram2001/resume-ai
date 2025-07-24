import { OptimizedResume } from '@/services/gemini';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Document, Packer, Paragraph, TextRun, AlignmentType, BorderStyle } from 'docx';
import { saveAs } from 'file-saver';

export const downloadAsPdf = async (element: HTMLElement, fileName: string) => {
  const canvas = await html2canvas(element, {
    scale: 2,
    backgroundColor: '#ffffff', // White background for better PDF appearance
    useCORS: true, 
  });

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  
  // If the height is greater than a page, we'll need to split it
  const pageHeight = pdf.internal.pageSize.getHeight();
  let heightLeft = pdfHeight;
  let position = 0;
  
  pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
  heightLeft -= pageHeight;
  
  while (heightLeft >= 0) {
    position = heightLeft - pdfHeight;
    pdf.addPage();
    pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
    heightLeft -= pageHeight;
  }
  
  pdf.save(`${fileName}.pdf`);
};

export const downloadAsDocx = async (resume: OptimizedResume, fileName: string) => {
  try {
    console.log('Starting DOCX generation for:', fileName);
    console.log('Resume data:', resume);

    // Safe array handling with proper bullet formatting
    const formatAchievements = (achievements: string[] = []) => {
        if (!achievements || achievements.length === 0) return [];
        return achievements.map(ach => new Paragraph({
            text: `• ${ach.replace(/^•\s*/, '')}`,
            spacing: { after: 120 },
            indent: { left: 720 } // Add indentation for bullet points
        }));
    };

    // Build contact info - format like your resume
    const contactParts = [
      resume?.personalInfo?.contact?.email,
      resume?.personalInfo?.contact?.phone,
      resume?.personalInfo?.contact?.location
    ].filter(Boolean);

    const linkParts = [
      resume?.personalInfo?.contact?.linkedin,
      resume?.personalInfo?.contact?.portfolio
    ].filter(Boolean);

    const doc = new Document({
        sections: [{
            properties: {
                page: {
                    margin: {
                        top: 720,
                        right: 720,
                        bottom: 720,
                        left: 720
                    }
                }
            },
            children: [
                // Redesigned Header
                new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [
                        new TextRun({
                            text: resume?.personalInfo?.name || 'Resume',
                            bold: true,
                            size: 36,
                            color: '000000'
                        })
                    ],
                    spacing: { after: 40 }
                }),
                ...(resume?.personalInfo?.title ? [
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                            new TextRun({
                                text: resume.personalInfo.title,
                                size: 22,
                                color: '222222'
                            })
                        ],
                        spacing: { after: 80 }
                    })
                ] : []),
                
                // Contact info in one line with | separators
                ...(contactParts.length > 0 ? [
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: contactParts.reduce((acc, part, i) => {
                            if (i > 0) acc.push(new TextRun({ text: " | ", size: 20 }));
                            acc.push(new TextRun({ text: part, size: 20 }));
                            return acc;
                        }, [] as TextRun[]),
                        spacing: { after: 120 }
                    })
                ] : []),
                
                // Links (LinkedIn, Portfolio)
                ...(linkParts.length > 0 ? [
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: linkParts.reduce((acc, part, i) => {
                            if (i > 0) acc.push(new TextRun({ text: " | ", size: 20 }));
                            acc.push(new TextRun({ text: part, size: 20 }));
                            return acc;
                        }, [] as TextRun[]),
                        spacing: { after: 360 }
                    })
                ] : []),

                // Professional Summary
                ...(resume?.professionalSummary ? [
                    // HR line before section
                    new Paragraph({
                        border: {
                            bottom: { color: '999999', space: 1, style: BorderStyle.SINGLE, size: 6 }
                        },
                        spacing: { after: 60 },
                        children: []
                    }),
                    new Paragraph({ 
                        children: [new TextRun({ 
                            text: "PROFESSIONAL SUMMARY", 
                            bold: true, 
                            size: 24 
                        })],
                        spacing: { after: 120 }
                    }),
                    new Paragraph({ 
                        text: resume.professionalSummary,
                        spacing: { after: 360 },
                        alignment: AlignmentType.JUSTIFIED
                    }),
                ] : []),

                // Core Skills
                ...(resume?.coreSkills ? [
                    // HR line before section
                    new Paragraph({
                        border: {
                            bottom: { color: '999999', space: 1, style: BorderStyle.SINGLE, size: 6 }
                        },
                        spacing: { after: 60 },
                        children: []
                    }),
                    new Paragraph({ 
                        children: [new TextRun({ 
                            text: "CORE SKILLS", 
                            bold: true, 
                            size: 24 
                        })],
                        spacing: { after: 120 }
                    }),
                    ...(resume.coreSkills.technical?.length > 0 ? [
                        new Paragraph({ 
                            children: [
                                new TextRun({ text: "Technical: ", bold: true, size: 22 }), 
                                new TextRun({ text: resume.coreSkills.technical.join(', '), size: 22 })
                            ],
                            spacing: { after: 240 }
                        })
                    ] : []),
                    ...(resume.coreSkills.soft?.length > 0 ? [
                        new Paragraph({ 
                            children: [
                                new TextRun({ text: "Soft Skills: ", bold: true, size: 22 }), 
                                new TextRun({ text: resume.coreSkills.soft.join(', '), size: 22 })
                            ],
                            spacing: { after: 240 }
                        })
                    ] : []),
                    ...(resume.coreSkills.tools?.length > 0 ? [
                        new Paragraph({ 
                            children: [
                                new TextRun({ text: "Tools: ", bold: true, size: 22 }), 
                                new TextRun({ text: resume.coreSkills.tools.join(', '), size: 22 })
                            ],
                            spacing: { after: 360 }
                        })
                    ] : []),
                ] : []),

                // Work Experience
                ...(resume?.workExperience?.length > 0 ? [
                    // HR line before section
                    new Paragraph({
                        border: {
                            bottom: { color: '999999', space: 1, style: BorderStyle.SINGLE, size: 6 }
                        },
                        spacing: { after: 60 },
                        children: []
                    }),
                    new Paragraph({ 
                        children: [new TextRun({ 
                            text: "WORK EXPERIENCE", 
                            bold: true, 
                            size: 24 
                        })],
                        spacing: { after: 120 }
                    }),
                    ...resume.workExperience.flatMap(exp => [
                        new Paragraph({ 
                            children: [new TextRun({ 
                                text: exp?.position || '', 
                                bold: true, 
                                size: 22 
                            })],
                            spacing: { after: 120 }
                        }),
                        new Paragraph({ 
                            children: [
                                new TextRun({ 
                                    text: `${exp?.company || ''} | ${exp?.location || ''}`, 
                                    size: 20 
                                }),
                                new TextRun({ 
                                    text: `    ${exp?.duration || ''}`, 
                                    italics: true,
                                    size: 20 
                                })
                            ],
                            spacing: { after: 240 }
                        }),
                        ...formatAchievements(exp?.achievements),
                        new Paragraph({
                            children: [new TextRun({ text: "", size: 20 })],
                            spacing: { after: 240 }
                        })
                    ])
                ] : []),

                // Projects
                ...(resume?.projects?.length > 0 ? [
                    // HR line before section
                    new Paragraph({
                        border: {
                            bottom: { color: '999999', space: 1, style: BorderStyle.SINGLE, size: 6 }
                        },
                        spacing: { after: 60 },
                        children: []
                    }),
                    new Paragraph({ 
                        children: [new TextRun({ 
                            text: "PROJECTS", 
                            bold: true, 
                            size: 24 
                        })],
                        spacing: { after: 120 }
                    }),
                    ...resume.projects.flatMap(proj => [
                        new Paragraph({ 
                            children: [new TextRun({ 
                                text: `${proj?.name || ''}: ${proj?.description || ''}`, 
                                bold: true, 
                                size: 22 
                            })],
                            spacing: { after: 120 }
                        }),
                        ...(proj?.technologies?.length > 0 ? [
                            new Paragraph({ 
                                children: [new TextRun({ 
                                    text: `Technologies: ${proj.technologies.join(', ')}`, 
                                    italics: true,
                                    size: 20 
                                })],
                                spacing: { after: 240 }
                            })
                        ] : []),
                        ...formatAchievements(proj?.achievements),
                        new Paragraph({
                            children: [new TextRun({ text: "", size: 20 })],
                            spacing: { after: 240 }
                        })
                    ])
                ] : []),

                // Education
                ...(resume?.education ? [
                    // HR line before section
                    new Paragraph({
                        border: {
                            bottom: { color: '999999', space: 1, style: BorderStyle.SINGLE, size: 6 }
                        },
                        spacing: { after: 60 },
                        children: []
                    }),
                    new Paragraph({ 
                        children: [new TextRun({ 
                            text: "EDUCATION", 
                            bold: true, 
                            size: 24 
                        })],
                        spacing: { after: 120 }
                    }),
                    new Paragraph({ 
                        children: [new TextRun({ 
                            text: resume.education.degree || '', 
                            bold: true, 
                            size: 22 
                        })],
                        spacing: { after: 120 }
                    }),
                    ...(resume.education.school ? [
                        new Paragraph({
                            children: [new TextRun({ text: resume.education.school, size: 20 })],
                            spacing: { after: 120 }
                        })
                    ] : []),
                    ...(resume.education.year ? [
                        new Paragraph({
                            children: [new TextRun({ text: resume.education.year, size: 20 })],
                            spacing: { after: 120 }
                        })
                    ] : []),
                    ...(resume.education.relevant_coursework ? [
                        new Paragraph({ 
                            children: [new TextRun({ 
                                text: `Relevant Coursework: ${resume.education.relevant_coursework}`,
                                size: 20
                            })],
                            spacing: { after: 240 }
                        })
                    ] : [])
                ] : [])
            ]
        }]
    });

    console.log('Document created, generating blob...');
    const blob = await Packer.toBlob(doc);
    console.log('Blob generated, starting download...');
    saveAs(blob, `${fileName}.docx`);
    console.log('Download initiated successfully');
  } catch (error) {
    console.error('Error generating DOCX:', error);
    console.error('Error details:', error.message, error.stack);
    alert('Error generating Word document. Please try again.');
  }
};