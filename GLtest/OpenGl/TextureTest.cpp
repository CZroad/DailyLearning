#include<glad/glad.h>
#include<GLFW/glfw3.h>
#include "stb_image.h"
#include"Shader.h"
#include<iostream>


void framebuffer_size_callback(GLFWwindow* window, int width, int height);
void initVAO();

const unsigned int SCR_W = 800;
const unsigned int SCR_H = 600;

int main() {
	 // ===============================  init ============================================ 
	glfwInit();
	glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 3);
	glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 3);
	glfwWindowHint(GLFW_OPENGL_PROFILE, GLFW_OPENGL_CORE_PROFILE);
	GLFWwindow* window = glfwCreateWindow(SCR_W, SCR_H, "LearnOpenGL", NULL, NULL);
	if (window == NULL)
	{
		std::cout << "Failed to create GLFW window" << std::endl;
		glfwTerminate();
		return -1;
	}
	glfwMakeContextCurrent(window);
	glfwSetFramebufferSizeCallback(window, framebuffer_size_callback);

	// glad: load all OpenGL function pointers
	// ---------------------------------------
	if (!gladLoadGLLoader((GLADloadproc)glfwGetProcAddress))
	{
		std::cout << "Failed to initialize GLAD" << std::endl;
		return -1;
	}
	// =================================================================

	initVAO();
	Shader mShader("Shaders/Vertex.vs","Shaders/Fragment.fs");
	 //Frame  Loop
	while (!glfwWindowShouldClose(window))
	{
		glClearColor(0.2f, 0.3f, 0.3f, 1.0f);
		glClear(GL_COLOR_BUFFER_BIT);
		mShader.use();
		glPolygonMode(GL_FRONT_AND_BACK, GL_LINE);
		glLineWidth(5);
		//glDrawArrays(GL_TRIANGLES, 0, 3);
		glDrawElements(GL_TRIANGLES,6,GL_UNSIGNED_INT, 0);
		// glfw: swap buffers and poll IO events (keys pressed/released, mouse moved etc.)
		// -------------------------------------------------------------------------------
		glfwSwapBuffers(window);
		glfwPollEvents();
	}


}

// resize window
void framebuffer_size_callback(GLFWwindow* window, int width, int height)
{
	// make sure the viewport matches the new window dimensions; note that width and 
	// height will be significantly larger than specified on retina displays.
	glViewport(0, 0, width, height);
}

void initVAO() {
	float vertices[] = {
	-0.5f, -0.5f, 0.0f,
	 0.5f, -0.5f, 0.0f,
	 0.5f,  0.5f, 0.0f,
	 -0.5f, 0.5f, 0.0f
	};

	unsigned int index[] = {
		0,1,2,
		2,3,0
	};

	unsigned int mVAO, mVBO, mEBO;
	glGenBuffers(1, &mEBO);
	glGenVertexArrays(1, &mVAO);
	glGenBuffers(1, &mVBO);

	glBindVertexArray(mVAO);
	glBindBuffer(GL_ARRAY_BUFFER, mVBO);
	glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, mEBO);

	glBufferData(GL_ELEMENT_ARRAY_BUFFER, sizeof(index), index, GL_STATIC_DRAW);
	glBufferData(GL_ARRAY_BUFFER, sizeof(vertices),vertices, GL_STATIC_DRAW);
	glVertexAttribPointer(0, 3, GL_FLOAT, GL_FALSE, 3 * sizeof(float), (void *) 0);
	glEnableVertexAttribArray(0);
	
}

