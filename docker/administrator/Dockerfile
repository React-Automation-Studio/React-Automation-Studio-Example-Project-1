FROM python:3.7.5
VOLUME /users


ADD ./submodules/React-Automation-Studio/administrator/requirements.txt /requirements.txt

RUN pip install -r requirements.txt
ADD ./submodules/React-Automation-Studio/administrator/scripts /scripts
ENV PATH="/scripts/:${PATH}"



WORKDIR /administrator/


ENTRYPOINT ["/bin/bash"]
