# src/Crew/llm.py
import os

import litellm
from crewai import LLM
from dotenv import load_dotenv

load_dotenv()


def _limpar(mensagens):
    if not isinstance(mensagens, list):
        return mensagens
    return [
        {k: v for k, v in m.items() if k != "cache_breakpoint"}
        if isinstance(m, dict) else m
        for m in mensagens
    ]


# Guardar os originais só uma vez (evita empilhar wrappers em reimports)
if not getattr(litellm, "_patched_limpar", False):
    _completion = litellm.completion
    _acompletion = litellm.acompletion

    def completion(*args, **kwargs):
        if "messages" in kwargs:
            kwargs["messages"] = _limpar(kwargs["messages"])
        return _completion(*args, **kwargs)

    async def acompletion(*args, **kwargs):
        if "messages" in kwargs:
            kwargs["messages"] = _limpar(kwargs["messages"])
        return await _acompletion(*args, **kwargs)

    litellm.completion = completion
    litellm.acompletion = acompletion

def criar_llm(
    model: str = "groq/openai/gpt-oss-120b",
    temperature: float = 0.5,
    api_key: str | None = None,
) -> LLM:
    return LLM(
        model=model,
        temperature=temperature,
        api_key=api_key or os.getenv("GROQ_API_KEY"),
    )