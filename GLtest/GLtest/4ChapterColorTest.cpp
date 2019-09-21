#include<GL/glut.h>

GLint testDot[] = { 500,500,0,0,0,0,1,0,0,0,1,0,0,0,1,1,0,0,0,0,1,1,1,0,1,0,0,0,0,1,1,0,0,0,1,1,0,0,1,1,0,1,0,0,1,1,1,1 };
GLubyte index[8] = {0,1,2,3,4,5,6,7};

void init() {
	glClearColor(1, 1, 1, 1);
	glMatrixMode(GL_PROJECTION);
	gluOrtho2D(0, 1000, 0, 800);
}

void colorTest(void) {

	glClear(GL_COLOR_BUFFER_BIT);
	glPointSize(20.0);
	glColor3f(0, 0, 0);
	//glInterleavedArrays(GL_C3F_V3F, 0, testDot);
	//glDrawElements(GL_POINTS, 1,GL_UNSIGNED_BYTE, testDot);
	
	glShadeModel(GL_SMOOTH);
	glFrontFace(GL_CW);
	
	glLineWidth(4.0);
	glPolygonMode(GL_FRONT, GL_LINE);

	glEnable(GL_BLEND);
	glEnable(GL_LINE_SMOOTH);

	glBegin(GL_TRIANGLES);
	glColor3f(0, 0, 1.0);
	glVertex2i(100, 100);
	glColor3f(0, 1.0, 0);
	glVertex2i(500, 565.68);
	glColor3f(1.0, 0, 0);
	glVertex2i(900, 100);
	glEnd();

	glBegin(GL_TRIANGLES);
	glColor3f(0, 0, 1.0);
	glVertex2i(800, 200);
	glColor3f(0, 1.0, 0);
	glVertex2i(500, 424.26);
	glColor3f(1.0, 0, 0);
	glVertex2i(200, 200);
	glEnd();


	glFlush();
}

void main(int argc, char** argv) {
	glutInit(&argc, argv);
	glutInitDisplayMode(GLUT_SINGLE|GLUT_RGB);
	glutInitWindowPosition(100, 100);
	glutInitWindowSize(1000, 800);
	glutCreateWindow("Color test");

	init();
	glutDisplayFunc(colorTest);
	
	glutMainLoop();
}