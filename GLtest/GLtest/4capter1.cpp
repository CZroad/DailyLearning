#include<GL/glut.h>

GLsizei winWidth = 600, winHeight = 500;
GLint xRaster = 25, yRaster = 150;
GLubyte label[15] = { '1', '2', '3', '4', '5', '6', '7', '8', '9',  '1','0', '1', '1', '1', '2' };
GLint dataValue[12] = {420, 342, 324, 310, 262, 490, 190, 196, 217, 240, 211, 316};

void init() {
	glClearColor(1.0, 1.0, 1.0, 1.0);
	glMatrixMode(GL_PROJECTION);
	gluOrtho2D(0.0, 600, 0, 500);
}

void lineGraph() {
	GLint month, k;
	GLint x = 30;

	glClear(GL_COLOR_BUFFER_BIT); //

	glColor3f(0.0, 0.0, 1.0);
	glBegin(GL_LINE_STRIP);
	for (k = 0; k < 12; k++) {
		glVertex2i(x + k * 50, dataValue[k]);
	}
	glEnd();

	glColor3f(1.0, 0.0, 0.0);
	for (k = 0; k < 12; k++) {
		glRasterPos2i(xRaster + k*50, dataValue[k] - 4);
		glutBitmapCharacter(GLUT_BITMAP_9_BY_15, '*');

	}

	glColor3f(0, 0, 0);
	xRaster = 20; 
	for (month = 0; month < 15; month++) {
		glRasterPos2i(xRaster, yRaster);
		if (month >= 9) {
			glutBitmapCharacter(GLUT_BITMAP_HELVETICA_12, label[month]);
			month++;
			glutBitmapCharacter(GLUT_BITMAP_HELVETICA_12, label[month]);
		}
		else {
			glutBitmapCharacter(GLUT_BITMAP_HELVETICA_12, label[month]);
		}
		xRaster += 50;
	}
	glFlush();
}

void winReshapeFcn(GLint newWidth, GLint newHeight) {
	glMatrixMode(GL_PROJECTION);
	glLoadIdentity();
	gluOrtho2D(0, GLdouble(newWidth), 0, GLint(newHeight));
	glClear(GL_COLOR_BUFFER_BIT);
}

void main(int argc, char** argv) {
	glutInit(&argc, argv);
	glutInitDisplayMode(GLUT_SINGLE|GLUT_RGB);
	glutInitWindowPosition(100, 100);
	glutInitWindowSize(winWidth, winHeight);
	glutCreateWindow("Line Chart Data Plot");

	init();
	glutDisplayFunc(lineGraph);
	glutReshapeFunc(winReshapeFcn);

	glutMainLoop();
}