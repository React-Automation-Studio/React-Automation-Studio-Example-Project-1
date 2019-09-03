FROM python:3.7
VOLUME /users


ADD ./src/automation-studio/administrator/requirements.txt /requirements.txt

RUN pip install -r requirements.txt
ADD ./src/automation-studio//administrator/scripts /scripts
ENV PATH="/scripts/:${PATH}"



WORKDIR /administrator/


ENTRYPOINT ["/bin/bash"]
